import React from "react";

const IntroSection = ({ title, subtitle, description }) => {
  return (
    <div className="w-80 d-flex flex-column align-items-center justify-content-center p-3 p-md-0">
      <h3 className="text-center text-danger fw-bold text-uppercase heading custom-letter-spacing">
        {title}
      </h3>
      <h1 className="text-center text-white fw-bold py-3">{subtitle}</h1>
      <p
        className="text-center heading fw-bold"
        style={{ fontSize: "1.2rem", color: "#f8f9fa" }}
      >
        {description}
      </p>
    </div>
  );
};

export default IntroSection;
