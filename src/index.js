import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.scss";
import Layout from "./components/layout";
import Home from "./pages/home";
import Search from "./pages/search";
import NotFound from "./pages/404";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
    return (
        <Router>
            <Helmet>
                <meta charset="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="NUZIMAZ is an image searcher website that uses the pexels public api to search and browse royalty free images shared by pexels creators."
                />
                <meta name="author" content="Boodooa Monish" />
            </Helmet>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
}

render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
