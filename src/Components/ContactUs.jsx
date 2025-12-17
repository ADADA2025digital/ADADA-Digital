import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import ButtonGlobal from "../Components/Button";
import ContactImg from "../assets/Images/contact-img.svg";
import { motion, AnimatePresence } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};
const rowReveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const container = {
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.03 },
  },
};
const field = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const ContactUs = () => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName.trim())) {
      newErrors.lastName =
        "Last name should not contain numbers or special characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile Number validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
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

      // Check if any required fields are empty
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "mobile",
        "company",
        "subject",
        "message",
      ];
      const hasEmptyRequiredFields = requiredFields.some(
        (field) => !formData[field].trim()
      );

      // Show general error if there are empty required fields or captcha is invalid
      if (hasEmptyRequiredFields || isCaptchaInvalid) {
        setGeneralError("Please fill in all the required fields correctly.");
      } else {
        setGeneralError("Please correct the errors in the form.");
      }

      setIsSubmitting(false);
      return;
    }

    // Clear any previous errors
    setErrors({});
    setGeneralError("");

    // If all validations pass
    emailjs
      .sendForm(
        "service_atcmru7",
        "template_rxvne43",
        formRef.current,
        "1JhpDFWb4tZlLmkCh"
      )
      .then(() => {
        setSent(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          company: "",
          subject: "",
          message: "",
        });
        setCaptchaValue("");
        setShowCaptcha(false);
        setIsSubmitted(false);
        setGeneralError("");
      })
      .catch((error) => {
        console.error("Email send error:", error?.text || error);
        setGeneralError(
          "There was a problem sending the email. Please try again."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="container-fluid contact-section d-flex align-items-center justify-content-center">
      <div className="container py-5 my-md-5 my-0 p-0">
        <div className="row align-items-center">
          {/* LEFT: intro */}
          <motion.div
            className="col-md-4 col-12 mb-4 mb-md-0"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="heading custom-letter-spacing heading fs-4 text-danger fw-bold text-uppercase">
              Get in Touch
            </div>
            <h2 className="fw-bold my-4 text-white">
              Lets <span className="outline">work together</span> on <br />
              your next project
            </h2>
            <p className="mb-5 text-white heading">
              We consistently exceed client expectations by delivering
              high-quality digital solutions. Get in touch with us to get
              started!
            </p>
            <motion.img
              src={ContactImg}
              alt="Description"
              className="img-animation img-fluid rounded"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>

          {/* RIGHT: form */}
          <motion.div
            className="col-md-8 col-12"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="form-container p-md-5 p-3 my-0 mx-auto rounded-3">
              <h3 className="mb-4 text-center text-white">
                Get in <span className="outline">Touch with Us</span> for <br />
                Any Questions or Inquiries
              </h3>

              {/* success message */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="alert alert-success text-center py-2"
                    role="alert"
                  >
                    ✅ Your message has been sent successfully. We'll get back
                    to you soon!
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit}>
                {/* ROW: first/last name */}
                <motion.div
                  className="row text-start"
                  variants={rowReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="col-md-6 col-sm-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="firstName"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      First Name <span className="text-danger">*</span>
                    </motion.label>
                    <motion.input
                      type="text"
                      name="firstName"
                      className={`form-control p-3 ${
                        errors.firstName && isSubmitted ? "is-invalid" : ""
                      }`}
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter First Name"
                    />
                    {errors.firstName && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.firstName}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="col-md-6 col-sm-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="lastName"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      Last Name <span className="text-danger">*</span>
                    </motion.label>
                    <motion.input
                      type="text"
                      name="lastName"
                      className={`form-control p-3 ${
                        errors.lastName && isSubmitted ? "is-invalid" : ""
                      }`}
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Last Name"
                    />
                    {errors.lastName && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.lastName}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                {/* ROW: email/mobile */}
                <motion.div
                  className="row text-start"
                  variants={rowReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="col-md-6 col-sm-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="email"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      Email Address <span className="text-danger">*</span>
                    </motion.label>
                    <motion.input
                      type="email"
                      name="email"
                      className={`form-control p-3 ${
                        errors.email && isSubmitted ? "is-invalid" : ""
                      }`}
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Email Address"
                    />
                    {errors.email && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.email}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="col-md-6 col-sm-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="mobile"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      Mobile Number <span className="text-danger">*</span>
                    </motion.label>
                    <motion.input
                      type="tel"
                      name="mobile"
                      className={`form-control p-3 ${
                        errors.mobile && isSubmitted ? "is-invalid" : ""
                      }`}
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter 10-digit Mobile Number"
                    />
                    {errors.mobile && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.mobile}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                {/* ROW: company/subject */}
                <motion.div
                  className="row text-start"
                  variants={rowReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="col-md-6 col-sm-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="company"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      Company Name <span className="text-danger">*</span>
                    </motion.label>
                    <motion.input
                      type="text"
                      name="company"
                      className={`form-control p-3 ${
                        errors.company && isSubmitted ? "is-invalid" : ""
                      }`}
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Company Name"
                    />
                    {errors.company && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.company}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    className="col-md-6 col-sm-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="subject"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      Subject <span className="text-danger">*</span>
                    </motion.label>
                    <motion.input
                      type="text"
                      name="subject"
                      className={`form-control p-3 ${
                        errors.subject && isSubmitted ? "is-invalid" : ""
                      }`}
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Subject"
                    />
                    {errors.subject && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.subject}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>

                {/* ROW: message + captcha */}
                <motion.div
                  className="row text-start mb-4"
                  variants={rowReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="col-12 mb-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <motion.label
                      htmlFor="message"
                      className="form-label heading text-white"
                      variants={field}
                    >
                      Message <span className="text-danger">*</span>
                    </motion.label>
                    <motion.textarea
                      className={`form-control p-3 ${
                        errors.message && isSubmitted ? "is-invalid" : ""
                      }`}
                      name="message"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Your Message (Minimum 10 characters)"
                    />
                    {errors.message && isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="invalid-feedback d-block"
                      >
                        {errors.message}
                      </motion.div>
                    )}
                  </motion.div>

                  {showCaptcha && (
                    <motion.div
                      key="captcha"
                      className="mt-1 d-flex flex-column align-items-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
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
                    </motion.div>
                  )}
                </motion.div>

                {/* ROW: submit */}
                <motion.div
                  className="row"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="col-12 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ButtonGlobal
                        text={isSubmitting ? "Sending..." : "Submit"}
                        type="submit"
                        className="px-5"
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
