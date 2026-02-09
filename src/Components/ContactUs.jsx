import React, { useState, useRef, useEffect } from "react";
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
  const formRef = useRef(null);
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

  // Add useEffect to hide success message after 3 seconds
  useEffect(() => {
    let timeoutId;
    
    if (sent) {
      timeoutId = setTimeout(() => {
        setSent(false);
      }, 3000); // 3 seconds
    }
    
    // Cleanup function to clear the timeout if component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sent]); // This effect runs when 'sent' state changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (generalError) setGeneralError("");
    if (name === "message" && captchaError) setCaptchaError("");

    if (isSubmitted) setErrors(validate(updatedFormData));

    if (name === "message") setShowCaptcha(value.trim().length > 0);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value || "");
    setCaptchaError("");
  };

  const validate = (data = formData) => {
    const newErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    else if (!/^[a-zA-Z\s]+$/.test(data.firstName.trim()))
      newErrors.firstName =
        "First name should not contain numbers or special characters";

    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!/^[a-zA-Z\s]+$/.test(data.lastName.trim()))
      newErrors.lastName =
        "Last name should not contain numbers or special characters";

    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        data.email.trim(),
      )
    )
      newErrors.email = "Enter a valid email address";

    if (!data.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(data.mobile.trim()))
      newErrors.mobile = "Enter a valid 10-digit mobile number";

    if (!data.company.trim()) newErrors.company = "Company name is required";
    if (!data.subject.trim()) newErrors.subject = "Subject is required";

    if (!data.message.trim()) newErrors.message = "Message is required";
    else if (data.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters long";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsSubmitting(true);
    setSent(false);

    const validationErrors = validate(formData);

    const shouldCheckCaptcha = formData.message.trim().length > 0;
    const isCaptchaInvalid = shouldCheckCaptcha && !captchaValue;

    if (isCaptchaInvalid) setCaptchaError("Please complete the reCAPTCHA.");
    else setCaptchaError("");

    if (Object.keys(validationErrors).length > 0 || isCaptchaInvalid) {
      setErrors(validationErrors);

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
        (f) => !formData[f].trim(),
      );

      setGeneralError(
        hasEmptyRequiredFields || isCaptchaInvalid
          ? "Please fill in all the required fields correctly."
          : "Please correct the errors in the form.",
      );

      setIsSubmitting(false);
      return;
    }

    setErrors({});
    setGeneralError("");

    try {
      await emailjs.sendForm(
        "service_k2vg37v",
        "template_zyksz58",
        formRef.current,
        "nysf1_-cRk-gUnJ2L",
      );

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
    } catch (error) {
      console.error("Email send error:", error?.text || error);
      setGeneralError(
        "There was a problem sending the email. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const submittedAt = new Date().toLocaleString();
  const year = new Date().getFullYear();

  return (
    <section className="container-fluid contact-section d-flex align-items-center justify-content-center">
      <div className="container py-5 my-md-5 my-0 p-0">
        <div className="row align-items-center">
          {/* LEFT */}
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
              alt="Contact"
              className="img-animation img-fluid rounded"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>

          {/* RIGHT */}
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

              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Hidden fields for template */}
                <input type="hidden" name="submitted_at" value={submittedAt} />
                <input type="hidden" name="year" value={year} />
                <input type="hidden" name="reply_to" value={formData.email} />
                
                {/* ADDED: Hidden type field with value "contact" */}
                <input type="hidden" name="type" value="contact" />

                {/* ROW: first/last */}
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
                      autoComplete="given-name"
                      className={`form-control p-3 ${errors.firstName && isSubmitted ? "is-invalid" : ""}`}
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter First Name"
                      disabled={isSubmitting}
                    />
                    {errors.firstName && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.firstName}
                      </div>
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
                      autoComplete="family-name"
                      className={`form-control p-3 ${errors.lastName && isSubmitted ? "is-invalid" : ""}`}
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Last Name"
                      disabled={isSubmitting}
                    />
                    {errors.lastName && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.lastName}
                      </div>
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
                      autoComplete="email"
                      className={`form-control p-3 ${errors.email && isSubmitted ? "is-invalid" : ""}`}
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Email Address"
                      disabled={isSubmitting}
                    />
                    {errors.email && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
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
                      autoComplete="tel"
                      className={`form-control p-3 ${errors.mobile && isSubmitted ? "is-invalid" : ""}`}
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter 10-digit Mobile Number"
                      disabled={isSubmitting}
                    />
                    {errors.mobile && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.mobile}
                      </div>
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
                      className={`form-control p-3 ${errors.company && isSubmitted ? "is-invalid" : ""}`}
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Company Name"
                      disabled={isSubmitting}
                    />
                    {errors.company && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.company}
                      </div>
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
                      className={`form-control p-3 ${errors.subject && isSubmitted ? "is-invalid" : ""}`}
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Subject"
                      disabled={isSubmitting}
                    />
                    {errors.subject && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.subject}
                      </div>
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
                      className={`form-control p-3 ${errors.message && isSubmitted ? "is-invalid" : ""}`}
                      name="message"
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      variants={field}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Enter Your Message (Minimum 10 characters)"
                      disabled={isSubmitting}
                    />
                    {errors.message && isSubmitted && (
                      <div className="invalid-feedback d-block">
                        {errors.message}
                      </div>
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
                        sitekey="6LfTOPoqAAAAALiP94ZP6TEYP5XiTsKjvr7dpYh9"
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
                          className="alert alert-success text-center py-3"
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
                        text={isSubmitting ? "Sending..." : "Submit"}
                        type="submit"
                        className="px-5"
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;