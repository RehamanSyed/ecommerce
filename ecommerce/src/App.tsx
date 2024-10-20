import { Col, Container, Row } from "react-bootstrap";
import { useQueryService } from "./services";

type ProductType = {
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  mainImage: {
    _id: string;
    localPath: string;
    url: string;
  };
  name: string;
  owner: string;
  price: number;
  stock: number;
};
function App() {
  const { data, status } = useQueryService({
    key: "allproducts",
    url: "/ecommerce/products?page=1&limit=10",
    method: "get",
  });

  if (status === "pending") {
    return "Loading...";
  }

  return (
    <Container>
      <Row>
        {data?.products?.map((product: ProductType) => (
          <Col key={product._id}>
            {/* <img src={product.mainImage.url} alt={product.name} /> */}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
