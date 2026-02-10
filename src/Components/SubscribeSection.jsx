import { useState, useEffect } from "react";
import ButtonGlobal from "./Button";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Fixed: Added quotes around the EmailJS credentials
  const serviceId = "service_k2vg37v";
  const templateId = "template_ix1u5wh";
  const publicKey = "nysf1_-cRk-gUnJ2L";

  // Effect to auto-hide success message after 5 seconds
  useEffect(() => {
    if (status.type === "success") {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000); // 5 seconds

      // Cleanup timer on unmount or when status changes
      return () => clearTimeout(timer);
    }
  }, [status.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus({ type: "error", message: "Please enter your email." });
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", message: "" });

      // Template variables (match these names in EmailJS template)
      const templateParams = {
        subscriber_email: trimmed,
        submitted_at: new Date().toLocaleString(),
        source: "Website",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus({ type: "success", message: "Thank you! You're subscribed." });
      setEmail("");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      className="container subscribe-section theme-background d-flex justify-content-center align-items-center w-100 box-sizing-border-box rounded-4 p-4 p-md-5 mb-5"
      aria-label="Newsletter subscription section"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="w-100"
      >
        <motion.div
          variants={stagger}
          className="d-flex justify-content-between align-items-center w-100 text-white flex-column flex-md-row"
        >
          {/* Text Section */}
          <motion.div
            variants={item}
            className="ms-3 text-start col-12 col-md-6 mb-4 mb-md-0"
            aria-label="Newsletter description"
          >
            <h2 className="fs-2 fw-bold mb-2">
              Stay Updated <br />
              With ADADA Digital
            </h2>
            <p className="lh-base heading fs-6">
              Get the latest updates on web development, digital marketing trends,
              product launches,
              <br /> and exclusive insights to scale your business digitally.
            </p>

            {status.message && (
              <motion.div
                key={status.type} // Key helps with animation when status changes
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-3 small ${
                  status.type === "success" ? "text-white" : "text-warning"
                }`}
                role="alert"
                aria-live="polite"
                aria-atomic="true"
              >
                {status.message}              
              </motion.div>
            )}
          </motion.div>

          {/* Form Section */}
          <motion.form
            variants={item}
            className="col-12 col-md-6 d-flex align-items-center bg-white p-2 rounded-5"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            onSubmit={handleSubmit}
            aria-label="Newsletter subscription form"
            noValidate
          >
            <motion.input
              type="email"
              placeholder="Enter email address"
              className="form-control border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              disabled={loading}
              style={{ outline: 'none', boxShadow: 'none' }}
              aria-label="Email address for newsletter subscription"
              aria-required="true"
              aria-describedby={status.message ? "status-message" : undefined}
              aria-invalid={status.type === "error" ? "true" : "false"}
            />

            <motion.div 
              whileHover={{ scale: 1.04 }} 
              whileTap={{ scale: 0.97 }}
              aria-label="Submit subscription form"
            >
              <ButtonGlobal 
                text={loading ? "Sending..." : "Subscribe"} 
                type="submit"
                disabled={loading}
                aria-label={loading ? "Sending subscription request" : "Subscribe to newsletter"}
                aria-busy={loading}
              />
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SubscribeSection;