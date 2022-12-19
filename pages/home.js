import React from "react";
import { SSRProvider } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import NavbarMain from "../components/NavbarMain";
import Headers from "../components/Headers";
import TicketForm from "../components/TicketForm";

const home = () => {
  return (
    <SSRProvider>
      <NavbarMain></NavbarMain>
      <AuthModal></AuthModal>
      <Headers></Headers>
      <TicketForm></TicketForm>
    </SSRProvider>
  );
};

export default home;
