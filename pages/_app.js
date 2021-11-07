import "../styles/globals.css";
import reduxWrapper from "../redux/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default reduxWrapper.withRedux(MyApp);
