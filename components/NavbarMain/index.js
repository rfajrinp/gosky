import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import Cookies from "js-cookie";

const NavbarMain = () => {
  const getAccessToken = () => Cookies.get("access_token");

  const [authenticated, setAuthenticated] = useState(!!getAccessToken());

  const isAuthenticated = () => setAuthenticated(!!getAccessToken());

  const [show, setShow] = useState({ login: false, confirm: false, register: false });

  const handleOpenLogin = () => setShow({ login: true });
  const handleCloseLogin = () => setShow({ login: false });

  const handleOpenRegister = () => setShow({ register: true });
  const handleCloseRegister = () => setShow({ register: false });

  const handleOpenConfirm = () => setShow({ confirm: true });
  const handleCloseConfirm = () => setShow({ confirm: false });

  async function doLogin({ email, password }) {
    const response = await fetch("https://gosky.up.railway.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data);
    const dataToken = data.data.accessToken;
    return dataToken;
  }

  async function doOtp({ email }) {
    const response = await fetch(`https://gosky.up.railway.app/api/auth/otp?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    const dataToken = data.data.otpToken;
    return dataToken;
  }

  async function doOtpConfirm({ name, password, otpCode, otpToken }) {
    const response = await fetch(`https://gosky.up.railway.app/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
        otp: otpCode,
        otpToken: otpToken,
      }),
    });

    const data = await response.json();
    console.log(data);
    const dataToken = data.data.accessToken;
    return dataToken;
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(false);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    getAccessToken();
  }

  useEffect(() => {
    setIsLoggedIn(!!authenticated);
  }, [authenticated]);

  function handleSubmitLogin(e) {
    setIsLoading(true);
    e.preventDefault();
    doLogin({ email, password })
      .then((accessToken) => Cookies.set("access_token", accessToken))
      .then(() => getDataUser(getAccessToken()))
      .then(() => isAuthenticated())
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));

    console.log(authenticated);
  }

  function handleSubmitOtp(e) {
    setIsLoading(true);
    e.preventDefault();
    doOtpConfirm({ name, password, otpCode, otpToken })
      .then((accessToken) => Cookies.set("access_token", accessToken))
      .then(() => getDataUser(getAccessToken()))
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }

  function handleSubmitRegister(e) {
    setIsLoading(true);
    e.preventDefault();
    doOtp({ email })
      .then((otpToken) => setOtpToken(otpToken))
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));

    handleOpenConfirm();
  }

  function handleLogout(e) {
    setIsLoading(true);
    e.preventDefault();
    Cookies.remove("access_token");
    isAuthenticated();
    setIsLoggedIn(false);
    setIsLoading(false);
  }

  async function getDataUser(token) {
    const response = await fetch("https://gosky.up.railway.app/api/auth/whoami", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const dataUser = data.data;
    console.log(token);
    setUserData(dataUser);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Image src="/static/images/logo.svg" width={125} height={50} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center ">
            <Nav.Link href="#link" className="text-dark">
              <i className="bi bi-file-earmark-text-fill me-2 primary-color"></i>
              <span>My Bookings</span>
            </Nav.Link>
            <Nav.Link href="#home" className="text-dark mx-2">
              <i className="bi bi-bell-fill primary-color"></i> <span>Notification</span>
            </Nav.Link>

            {!!authenticated ? (
              <>
                <Nav.Link href="#home" className="text-dark">
                  <Button variant="primary" className="primary-background" style={{ width: "120px" }} onClick={handleOpenLogin}>
                    <span>Login</span>
                  </Button>
                </Nav.Link>

                <Nav.Link href="#home" className="text-dark ">
                  <Button variant="primary" className="primary-background" style={{ width: "120px" }} onClick={handleOpenRegister}>
                    Register
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <span>hi</span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={show.login} onHide={handleCloseLogin} centered>
        <Form onSubmit={handleSubmitLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogin} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handleCloseLogin} style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show.register} onHide={handleCloseRegister} centered>
        <Form onSubmit={handleSubmitRegister}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter email" onChange={(e) => setName(e.target.value)} value={name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseLogin} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handleCloseLogin} style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={show.confirm} onHide={handleCloseConfirm} centered>
        <Form onSubmit={handleSubmitOtp}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kode OTP</Form.Label>
              <Form.Control type="text" placeholder="Enter otp code" onChange={(e) => setOtpCode(e.target.value)} value={otpCode} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirm} style={{ width: "100px" }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handleCloseConfirm} style={{ width: "100px" }}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Navbar>
  );
};

export default NavbarMain;
