import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ product, onAddToCart }) {
  const imageUrl =
    product.image ||
    "";

  return (
    <Card className="h-100 shadow-sm border-success product-card-inner">
      {imageUrl && (
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={product.name}
          style={{
            objectFit: "contain",
            height: "200px",     
            padding: "12px"
          }}
        />
      )}

      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="fs-6 fw-bold">
          {product.name}
        </Card.Title>

        <Card.Text className="small text-muted mb-3">
          <strong>Leírás:</strong> {product.description}
          <br />
          <strong>Ár:</strong> {product.price.toLocaleString()} Ft
          <br />
          <strong>Raktáron:</strong> {product.quantity} db
        </Card.Text>

        {/* Gomb mindig alul */}
        <Button
          className="btn btn-green w-100 mt-auto"
          onClick={() => onAddToCart(product)}
        >
          Kosárba
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
