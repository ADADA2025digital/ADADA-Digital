import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/Styles/Style.css";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import { BackToTop } from "./Components/BackToTop";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Portfolio from "./Pages/Portfolio";
import Contact from "./Pages/ContactUs";

import PageLoader from "./Components/PageLoader";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (location.pathname === "/" && !hasSeenLoader) {
      setLoading(true);

      const MIN_LOADER_MS = 6000;
      const start = Date.now();

      const finish = () => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("hasSeenLoader", "true");
        }, remaining);
      };

      if (document.readyState === "complete") {
        finish();
      } else {
        window.addEventListener("load", finish);
        return () => window.removeEventListener("load", finish);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="loader-wrap in">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="app-wrap app-show">
      <Header />
      <ScrollToTop />

      <main id="main-content" role="main">
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<Portfolio />} />
            <Route path="/contact-us" element={<Contact />} />
          </Routes>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;