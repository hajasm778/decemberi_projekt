import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./pages/Home.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // 🧠 Kosár betöltése localStorage-ből
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // 💾 Kosár mentése
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ➕➖ Mennyiség változtatás
  const handleQuantityChange = (id, amount) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );

    updateCart(updatedCart);
  };

  // 🗑️ Termék törlése
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  // 💰 Összeg
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="home-page py-5">
      <div className="container">
        <h2 className="section-title mb-4">🛒 Kosár</h2>

        {cartItems.length === 0 ? (
          <div className="custom-alert text-center p-4">
            A kosár üres.
          </div>
        ) : (
          <div className="row">
            {/* TERMÉKEK */}
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="mb-3 shadow-sm border-success"
                >
                  <Card.Body className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "contain",
                      }}
                    />

                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <small className="text-muted">
                        {item.price.toLocaleString()} Ft / db
                      </small>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, -1)
                        }
                      >
                        −
                      </Button>

                      <span className="fw-bold">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, 1)
                        }
                      >
                        +
                      </Button>
                    </div>

                    <div className="text-end ms-3">
                      <strong>
                        {(item.price * item.quantity).toLocaleString()} Ft
                      </strong>
                      <br />
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => handleRemove(item.id)}
                      >
                        Törlés
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {/* ÖSSZEGZÉS */}
            <div className="col-lg-4">
              <Card className="shadow border-success">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Összegzés</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Részösszeg</span>
                    <span>{totalPrice.toLocaleString()} Ft</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Szállítás</span>
                    <span>Ingyenes</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-5 fw-bold mb-4">
                    <span>Összesen</span>
                    <span>{totalPrice.toLocaleString()} Ft</span>
                  </div>

                  <Button className="btn btn-green w-100">
                    Tovább a fizetéshez
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
