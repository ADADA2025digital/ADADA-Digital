import React, { useEffect } from "react";
import TextType from "./TextType";
import TrueFocus from "./TrueFocus";
import { motion } from "framer-motion";

export default function PageLoader() {
  useEffect(() => {
    const animatedDotsContainer = document.querySelector(".animated-dots");

    function createDot() {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      const isMobile = window.innerWidth <= 768;
      const maxWidth = isMobile ? window.innerWidth * 0.8 : window.innerWidth;
      const maxHeight = isMobile
        ? window.innerHeight * 0.8
        : window.innerHeight;
      const dotSize = isMobile ? 5 : 5;

      const startX = Math.random() * maxWidth;
      const startY = Math.random() * maxHeight;

      const endX = Math.random() * maxWidth;
      const endY = Math.random() * maxHeight;

      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.left = `${startX}px`;
      dot.style.top = `${startY}px`;

      animatedDotsContainer.appendChild(dot);

      dot.animate(
        [
          { transform: `translate(0, 0)`, opacity: 1 },
          {
            transform: `translate(${endX - startX}px, ${endY - startY}px)`,
            opacity: 1,
          },
        ],
        {
          duration: isMobile ? 40000 : 80000,
          iterations: Infinity,
        },
      );
    }

    function updateDots() {
      animatedDotsContainer.innerHTML = "";

      const isMobile = window.innerWidth <= 768;
      const numDots = isMobile ? 30 : 60;

      for (let i = 0; i < numDots; i++) {
        createDot();
      }
    }

    updateDots();

    window.addEventListener("resize", updateDots);

    return () => {
      animatedDotsContainer.innerHTML = "";
      window.removeEventListener("resize", updateDots);
    };
  }, []);
  return (
    <div className="page-loader d-flex vh-100 w-100 align-items-center justify-content-center">
      <div className="container text-center px-3">
        {/* background dots */}
        <motion.div
          className="p-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="animated-dots overflow-hidden position-absolute top-0 start-0 w-100 h-100 z-1" />
        </motion.div>
        <div className="loader-truefocus mb-4">
          <TrueFocus
            sentence="ADADA Digital"
            manualMode={false}
            blurAmount={5}
            borderColor="#5227FF"
            glowColor="rgba(82, 39, 255, 0.55)"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
        </div>

        <div className="loader-texttype pt-5">
          <TextType
            as="div"
            className="loader-typing"
            text={[
              "ADADA Digital builds websites, apps, and powerful digital experiences.",
            ]}
            typingSpeed={45}
            deletingSpeed={25}
            pauseDuration={2000}
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
            loop={false}
          />
        </div>
      </div>
    </div>
  );
}
