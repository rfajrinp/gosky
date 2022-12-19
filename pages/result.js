import React from "react";
import { SSRProvider } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import NavbarMain from "../components/NavbarMain";
import Headers from "../components/Headers";
import TicketForm from "../components/TicketForm";
import TicketResult from "../components/TicketResult";

const result = () => {
  return (
    <SSRProvider>
      <NavbarMain></NavbarMain>
      <Headers></Headers>
      <TicketResult></TicketResult>
    </SSRProvider>
  );
};

export default result;
