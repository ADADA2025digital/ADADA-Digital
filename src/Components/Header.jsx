import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { Offcanvas } from "bootstrap";
import ButtonGlobal from "./Button";
import Logo from "../assets/Images/logo.png";
import Logosm from "../assets/Images/fav.svg";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Active link styling
  const getNavLinkClass = (path) => {
    const baseClass =
      "text-white fw-bold text-uppercase position-relative m-0 heading b-transparent text-center overflow-hidden z-2";
    return location.pathname === path ? baseClass : baseClass;
  };

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bootstrap offcanvas helpers
  const closeBootstrapOffcanvas = () => {
    const offcanvasEl = document.getElementById("mobileMenu");
    if (offcanvasEl) {
      const instance = Offcanvas.getInstance(offcanvasEl);
      if (instance) instance.hide();
    }
    setShowOffcanvas(false);
  };

  const handleToggleOffcanvas = () => {
    setShowOffcanvas((prev) => !prev);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    closeBootstrapOffcanvas();
  };

  const handleMobileQuickQuote = () => {
    closeBootstrapOffcanvas();
    setShowModal(true);
  };

  const closeMobileMenu = () => {
    const offcanvasElement = document.getElementById("mobileMenu");
    if (!offcanvasElement) return;

    const offcanvasInstance =
      Offcanvas.getInstance(offcanvasElement) ||
      new Offcanvas(offcanvasElement);

    offcanvasInstance.hide();
  };

  // Form handlers
  const formRef = useRef();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    type: "quote",
    submitted_at: "",
    subject: "Quick Quote Request from Website",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Clear specific error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Clear general error when any field changes
    if (generalError) {
      setGeneralError("");
    }

    // Clear captcha error when user types in message
    if (name === "message" && captchaError) {
      setCaptchaError("");
    }

    // If form has been submitted, validate this field immediately
    if (isSubmitted) {
      const validationErrors = validate();
      setErrors(validationErrors);
    }

    if (name === "message") {
      setShowCaptcha(value.trim().length > 0);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError("");
  };

  const validate = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName.trim())) {
      newErrors.firstName =
        "First name should not contain numbers or special characters";
    }

    // Mobile Number validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email.trim(),
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsSubmitting(true);
    setSent(false);

    // Prepare date for submission
    const currentDate = new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Update form data with current date
    const formDataWithDate = {
      ...formData,
      submitted_at: currentDate,
    };

    // First, validate all fields
    const validationErrors = validate();

    // Check if message has content (for captcha)
    const shouldCheckCaptcha = formData.message.trim().length > 0;
    const isCaptchaInvalid = shouldCheckCaptcha && !captchaValue;

    // Set captcha error if needed
    if (isCaptchaInvalid) {
      setCaptchaError("Please complete the reCAPTCHA.");
    } else {
      setCaptchaError("");
    }

    // Check if there are validation errors OR captcha is invalid
    if (Object.keys(validationErrors).length > 0 || isCaptchaInvalid) {
      setErrors(validationErrors);
      setIsSubmitting(false);

      // Check if any required fields are empty
      const requiredFields = ["firstName", "mobile", "email", "message"];
      const hasEmptyRequiredFields = requiredFields.some(
        (field) => !formData[field].trim(),
      );

      // Show general error if there are empty required fields or captcha is invalid
      if (hasEmptyRequiredFields || isCaptchaInvalid) {
        setGeneralError("Please fill in all the required fields correctly.");
      } else {
        setGeneralError("Please correct the errors in the form.");
      }

      return;
    }

    // Clear any previous errors
    setErrors({});
    setGeneralError("");

    // Prepare template parameters
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName || "", // Optional field
      mobile: formData.mobile,
      email: formData.email,
      message: formData.message,
      type: "quote",
      submitted_at: currentDate,
      subject: "Quick Quote Request from Website",
    };

    // If all validations pass
    emailjs
      .send(
        "service_k2vg37v",
        "template_zyksz58",
        templateParams,
        "nysf1_-cRk-gUnJ2L",
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setIsSubmitting(false);
          setSent(true);

          // Clear the form after successful submission
          setFormData({
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            message: "",
            type: "quote",
            submitted_at: "",
            subject: "Quick Quote Request from Website",
          });

          // Reset form state
          setErrors({});
          setCaptchaValue("");
          setShowCaptcha(false);
          setIsSubmitted(false);

          // Auto close modal after 3 seconds
          setTimeout(() => {
            onClose();
          }, 3000);
        },
        (error) => {
          console.error("Email send error:", error.text);
          setIsSubmitting(false);
          setGeneralError(
            "There was a problem sending the email. Please try again.",
          );
        },
      );
  };

  // Modal handlers
  const onClose = () => {
    setShowModal(false);
    setSent(false);
    setIsSubmitting(false);

    // cleanup any stuck bootstrap backdrops
    document
      .querySelectorAll(".offcanvas-backdrop")
      .forEach((el) => el.remove());
    document.body.classList.remove("offcanvas-backdrop");

    document.body.style.overflow = "auto";

    setFormData({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      message: "",
      type: "quote",
      submitted_at: "",
      subject: "Quick Quote Request from Website",
    });
    setErrors({});
    setGeneralError("");
    setShowCaptcha(false);
    setCaptchaValue(null);
    setCaptchaError("");
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (showModal) {
      // Disable scrolling when modal is opened
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <div className="container-fluid position-relative z-3 p-0">
        <nav
          className={`navbar navbar-expand-lg navbar-dark bg-black py-2 fixed-top ${
            scrolled ? "navbar-shrink" : ""
          }`}
        >
          <div className="container">
            <div className="col-auto d-flex align-items-center">
              <Link to="/" className="navbar-heading">
                <img src={Logo} alt="Logo of ADADA Digital" className="logo-img" />
              </Link>
            </div>

            {/* Center Nav (Desktop) */}
            <div className="col d-none d-md-flex justify-content-center p-0">
              <div
                id="navbar-nav"
                className="d-flex justify-content-center w-100"
              >
                <ul className="navbar-nav justify-content-center m-0">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className={`nav-link headernav-link cursor ${getNavLinkClass(
                        "/",
                      )}`}
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/about"
                      className={`nav-link headernav-link cursor ${getNavLinkClass(
                        "/about",
                      )}`}
                    >
                      About Us
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/services"
                      className={`nav-link headernav-link cursor ${getNavLinkClass(
                        "/services",
                      )}`}
                    >
                      Services
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/case-studies"
                      className={`nav-link headernav-link cursor ${getNavLinkClass(
                        "/case-studies",
                      )}`}
                    >
                      Case Studies
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/contact-us"
                      className={`nav-link headernav-link cursor ${getNavLinkClass(
                        "/contact-us",
                      )}`}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-auto d-flex justify-content-end align-items-center p-0">
              <button
                className="navbar-toggler p-3 my-0 d-lg-none border-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
                aria-label="Open navigation menu"
                onClick={handleToggleOffcanvas}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="d-none d-md-flex align-items-center justify-content-end ms-3">
                <ButtonGlobal
                  text="Get a quick quote"
                  onClick={() => setShowModal(true)}
                  ariaLabel="Open quick quote form"
                />
              </div>
            </div>
          </div>
        </nav>

        {/* OFFCANVAS */}
        <div
          className="offcanvas offcanvas-end w-100 bg-black"
          tabIndex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
        >
          <div
            className="offcanvas-header custom-close-btn"
            style={{ borderBottom: "1px solid #ed394c" }}
          >
            <h5 className="offcanvas-title w-100" id="mobileMenuLabel">
              <img
                src={Logo}
                alt="Logo of ADADA Digital"
                className="logo"
                style={{ height: "50px" }}
              />
            </h5>

            <button
              type="button"
              className="btn-close custom-close-btn text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body d-flex align-items-center justify-content-center">
            <ul className="navbar-nav text-center">
              <li className="nav-item py-3">
                <a
                  className="nav-link fw-bold fs-2 text-white"
                  href="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
              </li>

              <li className="nav-item py-3 fs-2">
                <a
                  className="nav-link fw-bold text-white"
                  href="/about"
                  onClick={closeMobileMenu}
                >
                  About Us
                </a>
              </li>
              <li className="nav-item py-3 fs-2">
                <a
                  className="nav-link fw-bold text-white"
                  href="/services"
                  onClick={closeMobileMenu}
                >
                  Services
                </a>
              </li>
              <li className="nav-item py-3 fs-2">
                <a
                  className="nav-link fw-bold text-white"
                  href="/case-studies"
                  onClick={closeMobileMenu}
                >
                  Case Studies
                </a>
              </li>
              <li className="nav-item py-3 fs-2">
                <a
                  className="nav-link fw-bold text-white"
                  href="/contact-us"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </a>
              </li>
              <li className="nav-item py-3 fs-2">
                <div className="col-auto py-4 d-flex align-items-center justify-content-center">
                  <ButtonGlobal
                    text="Get a quick quote"
                    onClick={handleMobileQuickQuote}
                    ariaLabel="Open quick quote form"
                    aria-haspopup="dialog"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal-backdrop d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 overflow-auto py-md-5 p-y-0"
            style={{ zIndex: 1050, backdropFilter: "blur(5px)" }}
          >
            <div className="col-md-6 col-12 mobile-full py-4 py-md-0">
              <div className="card bg-dark rounded-4 quote z-1 overflow-hidden text-white position-relative">
                <div className="quote-outline overflow-hidden position-absolute"></div>

                <div className="quote-border d-flex align-items-center"></div>
                <div className="quote-icons z-1 d-flex align-items-center justify-content-center flex-row"></div>
                <div className="card-header border-0 position-relative">
                  <img
                    src={Logosm}
                    alt="Logo of ADADA Digital"
                    className="logo-img position-relative"
                  />

                  <button
                    type="button"
                    className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                    onClick={onClose}
                    aria-label="Close"
                  />
                </div>
                <div className="card-body z-2 p-4">
                  <h3 className="text-white text-center mb-4">
                    Get a Quick Quote
                  </h3>

                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label
                          htmlFor="firstName"
                          className="form-label text-white"
                        >
                          First Name*
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className={`form-control ${
                            errors.firstName && isSubmitted ? "is-invalid" : ""
                          }`}
                          id="firstName"
                          placeholder="Enter First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                          }}
                        />
                        {errors.firstName && isSubmitted && (
                          <div className="invalid-feedback d-block">
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="lastName"
                          className="form-label text-white"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Last Name (Optional)"
                          value={formData.lastName}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label
                          htmlFor="mobile"
                          className="form-label text-white"
                        >
                          Mobile Number*
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          className={`form-control ${
                            errors.mobile && isSubmitted ? "is-invalid" : ""
                          }`}
                          id="mobile"
                          placeholder="Enter Mobile Number"
                          value={formData.mobile}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                          }}
                        />
                        {errors.mobile && isSubmitted && (
                          <div className="invalid-feedback d-block">
                            {errors.mobile}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label text-white"
                        >
                          Email Address*
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${
                            errors.email && isSubmitted ? "is-invalid" : ""
                          }`}
                          id="email"
                          placeholder="Enter Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                          }}
                        />
                        {errors.email && isSubmitted && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-12">
                        <label
                          htmlFor="message"
                          className="form-label text-white"
                        >
                          Message*
                        </label>
                        <textarea
                          className={`form-control ${
                            errors.message && isSubmitted ? "is-invalid" : ""
                          }`}
                          name="message"
                          id="message"
                          rows="4"
                          placeholder="Enter Your Message"
                          value={formData.message}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                          }}
                        ></textarea>
                        {errors.message && isSubmitted && (
                          <div className="invalid-feedback d-block">
                            {errors.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {showCaptcha && (
                      <div className="mb-3 d-flex flex-column align-items-center">
                        <ReCAPTCHA
                          sitekey="6LcVdPsqAAAAAFeo84JcbbftJHjL6T0UKf0KCAjQ"
                          theme="dark"
                          onChange={handleCaptchaChange}
                        />
                        {captchaError && isSubmitted && (
                          <div className="text-danger mt-2 d-block text-center">
                            {captchaError}
                          </div>
                        )}
                      </div>
                    )}

                    {/* submit */}
                    <div className="row">
                      <div className="col-12 text-center">
                        {/* General error */}
                        <AnimatePresence>
                          {generalError && (
                            <motion.div
                              key="generalError"
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="alert alert-danger text-center py-3"
                              role="alert"
                            >
                              {generalError}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* success */}
                        <AnimatePresence>
                          {sent && (
                            <motion.div
                              key="sent"
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className="alert alert-success text-center py-3"
                              role="alert"
                            >
                              Your message has been sent successfully. We'll get
                              back to you soon!
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <ButtonGlobal
                            text={
                              isSubmitting ? "Sending..." : "Submit Message"
                            }
                            type="submit"
                            disabled={isSubmitting}
                            ariaLabel="Submit contact form message"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
