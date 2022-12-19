import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppWrapper } from "./context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </div>
  );
}

export default MyApp;
