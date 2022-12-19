import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useRouter } from "next/router";
import { useAppContext } from "../../pages/context/AppContext";

const TicketForm = () => {
  const router = useRouter();
  const [appState, setAppState] = useAppContext();

  const [formData, setFormData] = useState({
    category: "ONE_WAY",
    from: "",
    to: "",
    departureTime: "",
    returnTime: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const res = await fetch(`https://gosky.up.railway.app/api/tickets?category=${formData.category}&from=${formData.from}&to=${formData.to}&departureTime=${formData.departureTime}&returnTime=${formData.returnTime}`, requestOptions);
    const data = await res.json();

    setAppState(data);

    router.push({
      pathname: "/result",
    });
  };

  useEffect(() => {
    console.log(appState);
  });

  return (
    <div className="TicketFormSection">
      <div className="container">
        <Card style={{}} className="mx-auto">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-4">
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Dari" className="mb-3">
                      <Form.Select name="from" value={formData.from} required onChange={(e) => setFormData({ ...formData, from: e.target.value })}>
                        <option value="JAKARTA">Jakarta</option>
                        <option value="DENPASAR">Denpasar</option>
                        <option value="YOGYAKARTA">Yogyakarta</option>
                        <option value="SURABAYA">Surabaya</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-4">
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Ke" className="mb-3">
                      <Form.Select name="to" value={formData.to} required onChange={(e) => setFormData({ ...formData, to: e.target.value })}>
                        <option value="DENPASAR">Denpasar</option>
                        <option value="YOGYAKARTA">Yogyakarta</option>
                        <option value="SURABAYA">Surabaya</option>
                        <option value="MEDAN">Medan</option>
                        <option value="SOLO">Solo</option>
                        <option value="SEMARANG">Semarang</option>
                        <option value="PADANG">Padang</option>
                        <option value="MAKASSAR">Makassar</option>
                        <option value="PONTIANAK">Pontianak</option>
                        <option value="BANJARMASIN">Banjarmasin</option>
                        <option value="PALEMBANG">Palembang</option>
                        <option value="BANDUNG">Bandung</option>
                        <option value="JAYAPURA">Jayapura</option>
                        <option value="JAKARTA">Jakarta</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-4 d-flex">
                  <Form.Group className="mb-3 d-flex justify-content-around align-items-center w-100">
                    <Form.Check type="radio" label="One Way" name="category" value="ONE_WAY" onChange={(e) => setFormData({ ...formData, category: e.target.value })} defaultChecked />

                    <Form.Check type="radio" label="Round Trip" name="category" value="ROUND_TRIP" onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <Form.Group className="">
                    <FloatingLabel controlId="floatingInput" label="Pergi" className="" required>
                      <Form.Control type="date" name="departureTime" onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })} />
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-4">
                  <Form.Group className="">
                    <FloatingLabel controlId="floatingInput" label="Pulang" className="">
                      <Form.Control type="date" name="returnTime" disabled={formData.category == "ONE_WAY"} onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })} />
                    </FloatingLabel>
                  </Form.Group>
                </div>
                <div className="col-4">
                  <Button variant="primary" type="submit" className="w-100 h-100 primary-background">
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TicketForm;
