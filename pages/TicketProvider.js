import { createContext, useContext } from "react";

const TicketContext = createContext();

export function TicketProvider(props) {
  const { value, children } = props;

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}

export function useTicketContext() {
  return useContext(TicketContext);
}
