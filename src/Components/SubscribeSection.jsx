import ButtonGlobal from "./Button";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function SubscribeSection() {
  return (
    <div className="container subscribe-section theme-background d-flex justify-content-center align-items-center w-100 box-sizing-border-box rounded-4 p-4 p-md-5 mb-5">
      {/* Whole section reveal */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="w-100"
      >
        {/* Stagger text + form */}
        <motion.div
          variants={stagger}
          className="d-flex justify-content-between align-items-center w-100 text-white flex-column flex-md-row"
        >
          {/* Text Section */}
          <motion.div
            variants={item}
            className="ms-3 text-start col-12 col-md-6 mb-4 mb-md-0"
          >
            <h2 className="fs-2 fw-bold mb-2">
              Stay Updated <br />
              With Adada Digital
            </h2>
            <p className="lh-base heading fs-6">
              Get the latest updates on web development, digital marketing
              trends, product launches,
              <br /> and exclusive insights to scale your business digitally.
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.form
            variants={item}
            className="col-12 col-md-6 d-flex align-items-center bg-white p-2 rounded-5"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.input
              type="email"
              placeholder="Enter email address"
              className="form-control border-0"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            />
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <ButtonGlobal text="Subscribe" />
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SubscribeSection;
