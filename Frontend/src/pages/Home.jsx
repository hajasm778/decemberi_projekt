import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home({ isLoggedIn }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username") || "";

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3778/products");
      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        setError(data.message || "Hiba a termékek lekérésekor");
      }
    } catch {
      setError("Nem sikerült lekérdezni a termékeket");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedProductId(id);

    const selected = products.find((p) => p.id === Number(id));
    if (selected) {
      setName(selected.name || "");
      setDescription(selected.description || "");
      setPrice(selected.price || "");
      setQuantity(selected.quantity || "");
      setImage(selected.image || "");
    }
  };
      

  //KOSÁR 
  const handleAddToCart = (product) => {
    //  nincs bejelentkezve
    if (!isLoggedIn) {
      setMessage("❌ Jelentkezzen be a vásárláshoz!");
      return;
    }

    //  van bejelentkezve → kosár frissítés
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = storedCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = storedCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...storedCart,
        { ...product, quantity: 1 },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setMessage(`✅ ${product.name} hozzáadva a kosárhoz!`);
  };

  return (
    <div className="home-page py-5">
      <div className="container">

        {isLoggedIn && (
          <div className="welcome-box p-4 mb-5">
            <h2>Üdvözlöm, {username}! 👋</h2>
            <p className="mb-3">Kellemes vásárlást kívánunk!</p>
            <Link to="/profile" className="btn btn-light">
              Profil szerkesztése
            </Link>
          </div>
        )}

        <h3 className="section-title mb-4">
          🌿 Elérhető termékek
        </h3>

        {message && (
          <div className="custom-alert text-center p-3 mb-4">
            {message}
          </div>
        )}

        <div className="row">
          {products.length === 0 ? (
            <p className="text-muted">Nincsenek termékek.</p>
          ) : (
            products.map((product) => (
              <div
                className="col-12 col-sm-6 col-lg-4 mb-4"
                key={product.id}
              >
                <div className="product-card h-100">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;
