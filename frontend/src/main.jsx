import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./router/route";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={undefined}>
      <Router />
    </ChakraProvider>
  </Provider>
);
