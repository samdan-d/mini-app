import React from 'react';
import { Button, Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import img1 from './assets/product-1.jpg';
import img2 from './assets/product-2.jpg';

const code = 'B3D3DF06DDA15B44E0532A64A8C0DF61';
const tokenUrl = 'https://test.hipay.mn/v2/auth/token1';
const profileUrl = 'https://test.hipay.mn/v2/auth/token1';

function App() {
  const [products, setProducts] = React.useState([{
    name: 'T-Shirt 1',
    price: "15'000",
    image: img1
  }, {
    name: 'T-Shirt 2',
    price: "20'000",
    image: img2
  }]);
  const [token, setToken] = React.useState(null);
  const [profile, setProfile] = React.useState({ name: 'hi' });

  const getToken = React.useCallback(async () => {
    const tokenResponse = await fetch(tokenUrl, {
      mode: 'cors',
      method: 'POST',
      body: {
        client_id: "songo.mn",
        client_secret: "NEgxQ0x4bTJ0WXJPOW1JeA",
        redirect_uri: "https://google.com",
        code,
        grant_type: "authorization_code"
      }
    });
    const data = await tokenResponse.json();
    if (data.code === '1') {
      console.log(data)
    } else {
      console.error('Токен авхад алдаа гарлаа: ', data.details)
    }
  }, []);

  React.useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Mini app</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Төлбөр</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              {profile.name && `Сайн уу? ${profile.name}`}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container >
        <Row>
          {
            products.map((product, i) => (
              <Col key={i} xs={6} style={{ paddingTop: 16 }}>
                <Card >
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>₮{product.price}</Card.Text>
                    <Button variant="primary">Авах</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
}

export default App;
