import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/Styles/Style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import { BackToTop } from "./Components/BackToTop";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Portfolio from "./Pages/Portfolio";
import Contact from "./Pages/ContactUs";
import Blog from "./Pages/Blog";

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<Portfolio />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
