import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "next/image";
import Link from "next/link";

import { useAppContext } from "../../pages/context/AppContext";

const TicketResult = (props) => {
  const [appState, setAppState] = useAppContext();

  const data = appState.data;

  const resultMinutes = (time) => {
    const d = new Date(time);
    return d.getTime();
  };

  const arriveTime = (time, duration) => {
    const d = new Date(time);
    d.setMinutes(d.getMinutes() + duration);
    return d.toISOString();
  };

  return (
    <div className="TicketResultSeciton">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-3">
            <Card>
              <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                <link href="/home">
                  <Button variant="primary">Change serach</Button>
                </link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-8">
            <Card className="mb-4 py-3">
              <Card.Body className="d-flex justify-content-between">
                <div>
                  <div>
                    {data[0].from} <i class="bi bi-arrow-right"></i> {data[0].to}{" "}
                  </div>
                  <div>
                    {data[0].departureTime.split("T")[0]} | {data[0].category}{" "}
                  </div>
                </div>

                <a href="/home" className="d-flex">
                  <Button variant="primary primary-background px-4 ">Change serach</Button>
                </a>
              </Card.Body>
            </Card>
            {data.map((ticket, key) => {
              return (
                <Card className="mb-4">
                  <Card.Img variant="top" src={ticket.imageUrl} style={{ maxHeight: "100px", objectFit: "cover" }} />
                  <Card.Body className="row p-4 justify-content-between d-flex">
                    <div className="col-2 text-center">
                      <Image src="/static/images/logo.svg" width={125} height={50} className="me-4" />
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      <Card.Text className="d-flex align-items-center">
                        <div className="text-center me-5">
                          <p className="mb-1">{ticket.departureTime.match(/\d\d:\d\d/)}</p>
                          <p className="mb-0">{ticket.from}</p>
                        </div>
                        <div className="text-center mx-4">
                          <p className="mb-1">0H {ticket.duration}M</p>
                          <div className="mb-0">
                            <hr className="w-100"></hr>
                          </div>
                        </div>
                        <div className="text-center ms-5">
                          <p className="mb-1">{arriveTime(ticket.departureTime, ticket.duration).match(/\d\d:\d\d/)}</p>
                          <p className="mb-0">{ticket.to}</p>
                        </div>
                      </Card.Text>
                    </div>
                    <div className="col-3 text-center">
                      <div>
                        {" "}
                        <span className="fw-semibold">Rp {ticket.price.toLocaleString()}</span> / pax
                      </div>
                      <Link href={"/tickets/" + ticket.id}>
                        <Button variant="primary w-100 primary-background">Choose</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketResult;
