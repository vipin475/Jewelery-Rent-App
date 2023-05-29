import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BlockchainProvider } from "./context/BlockchainContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BlockchainProvider>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </BlockchainProvider>
);
