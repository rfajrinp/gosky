import React from "react";
import { useRouter } from "next/dist/client/router";
import NavbarMain from "../../components/NavbarMain";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";

const Ticket = ({ data }) => {
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    getDataUser();
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const arriveTime = (time, duration) => {
    const d = new Date(time);
    d.setMinutes(d.getMinutes() + duration);
    return d.toISOString();
  };

  async function getDataUser() {
    const newToken = Cookies.get("access_token");
    const response = await fetch("https://gosky.up.railway.app/api/auth/whoami", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${newToken}`,
      },
    });
    const data = await response.json();
    const dataUser = data.data;
    setUserData(dataUser);
  }

  async function handleBook() {
    const newToken = Cookies.get("access_token");
    const response = await fetch("https://gosky.up.railway.app/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
      },
      body: JSON.stringify({
        ticketId: id,
        amount: 1,
      }),
    });
    const data = await response.json();
    console.log(response);
  }

  console.log(userData);
  return (
    <div className="TicketDetailSection">
      <NavbarMain></NavbarMain>
      <div className="container">
        <h4 className="fw-semibold mt-4">Your Booking</h4>
        <p> Isi detail pemesanan booking anda</p>

        <h5 className="mb-3">Contact Details</h5>
        <div className="row">
          <div className="col-8">
            <Form>
              <Card>
                <Card.Body>
                  <Card.Title>contact details for E-Tciket</Card.Title>

                  <div className="row">
                    <div className="col-6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" value={userData.name} />
                        <Form.Text className="text-muted">e.g. your name</Form.Text>
                      </Form.Group>
                    </div>
                    <div className="col-6"></div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={userData.email} />
                        <Form.Text className="text-muted">e.g. email@gamil.com</Form.Text>
                      </Form.Group>
                    </div>
                    <div className="col-6">
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="number" placeholder="Your Mobile Number" />
                        <Form.Text className="text-muted">e.g. +628948759</Form.Text>
                      </Form.Group>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="d-flex mt-3">
                <Button variant="primary ms-auto primary-background px-5" onClick={handleBook}>
                  Confirm
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-4">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-center align-items-center">
                  {data.from} <i className="bi bi-arrow-right mx-3 fs-3"></i> {data.to}
                </Card.Title>
                <hr></hr>
                <Card.Text className="fw-semibold">Departure : {data.departureTime.split("T")[0]}</Card.Text>
                <div className="d-flex align-items-center">
                  <Image src="/static/images/logo.svg" width={125} height={50} className="me-3" />
                  <p className="m-0 fs-5 fw-semibold">GoSky Airline</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center mt-2">
                    <div className="text-center me-5">
                      <p className="mb-1">{data.departureTime.match(/\d\d:\d\d/)}</p>
                      <p className="mb-0">{data.from}</p>
                    </div>
                    <div className="text-center mx-4">
                      <p className="mb-1">{data.duration}M</p>
                      <hr></hr>
                    </div>
                    <div className="text-center ms-5">
                      <p className="mb-1">{arriveTime(data.departureTime, data.duration).match(/\d\d:\d\d/)}</p>
                      <p className="mb-0">{data.to}</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(`https://gosky.up.railway.app/api/tickets/${context.params.id}`);
  const result = await res.json();

  console.log(res);

  return {
    props: { data: result.data },
  };
}

export default ticket;
