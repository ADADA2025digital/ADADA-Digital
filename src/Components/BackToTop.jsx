import { useEffect, useRef, useState } from "react";

export function BackToTop() {
  const pathRef = useRef(null);
  const wrapRef = useRef(null);
  const pathLength = 307.919; // Matches stroke-dasharray
  const [show, setShow] = useState(false);

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollTop / docHeight;

    const drawLength = pathLength * (1 - scrollPercentage);
    if (pathRef.current) {
      pathRef.current.style.strokeDashoffset = drawLength;
    }

    setShow(scrollTop > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="d-flex align-items-end">
      <div
        className={`progress-wrap cursor position-fixed d-flex align-items-center justify-content-center border-0 rounded-circle ${
          show ? "active-progress" : ""
        }`}
        onClick={scrollToTop}
        ref={wrapRef}
      >
        <svg height="1.2em" className="arrow " viewBox="0 0 512 512">
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
        </svg>
        <p className="text position-absolute text-white d-flex align-items-center justify-content-center">
          Back to Top
        </p>
      </div>
    </div>
  );
}
