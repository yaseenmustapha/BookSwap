import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const notificationsIcon = <FontAwesomeIcon icon={faBell} />;
const username = "sexybeast123";
const isAuthenticated = false;

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">GameSwap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link href="#home">Welcome, {username}</Nav.Link>
                <NavDropdown title={notificationsIcon} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Notification 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Notification 2
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Notification 3
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item className="ml-auto">
                  <Button variant="success" href="/createlisting">
                    Create listing
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <Navbar.Text className="ml-auto">
                <a href="/register">Register</a> or <a href="/login">log in</a>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
