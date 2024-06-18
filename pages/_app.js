import "../styles/globals.css";
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Contexts/NFTMarketplaceContext";
import {store, persistor } from '../Redux/store';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NFTMarketplaceProvider> 
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </NFTMarketplaceProvider>
    </PersistGate>
  </Provider>
);

export default MyApp;
