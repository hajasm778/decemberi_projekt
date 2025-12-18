//FÜGGÖSÉGEK
import express from "express" ;
import cors from "cors";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const app = express();

app.use(express.json());
app.use(cors());


const pool = mysql.createPool({     
    "host" : "localhost",
    "user" : "root",
    "password" : "",
    "database" : "sajat_projekt"
});

//Register
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, address, phone_number } = req.body;

        // Felhasználónév ellenőrzés
        if (!username || typeof username !== "string") {
            throw new Error("Hibás felhasználónév");
        }

        // Email ellenőrzés
       if(!email || typeof email !== "string"){
            throw new Error("Hibás email")
       }

        // Jelszó ellenőrzés
        if (!password || typeof password !== "string" || password.length < 6) {
            throw new Error("Hibás jelszó (min. 6 karakter)");
        }

        // Cím ellenőrzés
        if (!address || typeof address !== "string") {
            throw new Error("Hibás cím");
        }

        // Telefonszám ellenőrzés
        if(!phone_number || typeof phone_number !== "number"){
            throw new Error("Hibás telefonszám")
        }

        // Jelszó hash-elése
        const hashedPassword = await bcrypt.hash(password, 12);

        // Adatmentés az adatbázisba
        const [result] = await pool.query(
            "INSERT INTO users (username, email, password, address, phone_number) VALUES (?, ?, ?, ?, ?)",
            [username, email, hashedPassword, address, phone_number]
        );

        if (result.affectedRows < 1) {
            throw new Error("Sikertelen adatmentés");
        }

        res.status(201).json({ message: "Sikeres regisztráció!" });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message || "Sikertelen regisztráció!"
        });
    }
});



//Login
app.post("/login", async (req,res) => {
    try {
        const body = req.body;

        if(Object.keys(body).length !== 2){
            throw new Error("Hiba");
        }
        if(!body.username || typeof body.username !== "string"){
            throw new Error("Hiba");
        }
        if(!body.password || typeof body.password !== "string"){ 
            throw new Error("Hiba");
        }

        const [result] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [body.username]
        );

        if(result.affectedRows < 1){ 
            throw new Error("Hiba");  
        };

        const isPassWordValid = await bcrypt.compare(body.password, result[0].password)
        if(!isPassWordValid){
            throw new Error("Hibás / Nincs egyezés!");
        };

        const token = jwt.sign({
            _id : result[0].id
        },"secret");

        res.json({
            token : token,
            username : result[0].username
        });
        

    } catch (error) {
        console.log(error);
        if(error.message.includes("Hiba")){
            res.status(400).json({message : error.message});
            return
        }

        res.status(500).json({message : "Sikertelen bejelentkezés!"});
    }
})

app.put("/password", async (req,res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            throw new Error("Hiba");
        }

        const secretPass = await bcrypt.hash(password, 12);

        const [result] = await pool.query(
            "UPDATE users SET password = ? WHERE email = ?",
            [secretPass, email]
        );

        if(result.affectedRows < 1){ 
            throw new Error("Hiba");  
        }

        res.json({message : "Sikeresen módosította a jelszavát!"});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message : error.message});
    }
})

app.get("/profile", async (req,res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            res.status(401).json({message : "Hibás token"});
        }

        const verify = jwt.verify(token, "secret");

        const [result] = await pool.query(
            "SELECT username, email, address, phone_number FROM users WHERE id = ?;",
            [verify._id]
        );

        if(result.length === 0){
            throw new Error("Nem található a profil!");
        }
        
        res.json(result[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json({message : error.message});
    }
})

app.put("/profile", async (req,res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            res.status(401).json({message : "Hibás token"});
        }

        const verify = jwt.verify(token, "secret");

        const {username, email, address, phone_number} = req.body;

        await pool.query(
            "UPDATE users SET username = ?, email = ?, address = ?, phone_number = ? WHERE id = ?",
            [username, email, address, phone_number, verify._id]
        );

        
        res.json({message : "Sikeres módositás a profilodon!"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message : error.message});
    }
     });
     
  app.get("/products", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM products");
      res.json(rows);
    } catch (error) {
        console.error(error)
      res.status(500).json({ error: error.message });
    }
  });


//PORT
const PORT = 3778;
app.listen(PORT, () => {
    console.log(`A szerver sikeresen elindult a localhost ${PORT}-n :) !`);
});