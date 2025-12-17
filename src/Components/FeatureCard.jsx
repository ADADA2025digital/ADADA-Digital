import React from "react";

const FeatureCard = ({
  imageSrc,
  title,
  text,
  gradientBackground = false,
  customClass = "",
  colClass = "",
  backgroundImage,
}) => {
  const isGradientOrCustom = gradientBackground || customClass;

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <div
      className={`card custom-card my-3 mx-1 bg-transparent d-flex flex-column h-100 rounded-4 mb-4 flex-fill ${customClass} card-hover`}
      style={{
        border: "1px solid #2f2e2e",
        ...backgroundStyle,
      }}
    >
      <div
        className={`border-0 p-3 text-center z-1 rounded-3 position-relative text-white flex-fill d-flex flex-column justify-content-center align-items-center ${
          gradientBackground ? "text-center" : ""
        }`}
        style={
          gradientBackground
            ? {
                background: "linear-gradient(90deg, #ED384C, #F37032)",
                color: "white",
              }
            : {}
        }
      >
        <img src={imageSrc} alt={title} className="mb-3" />
        <h5 className="card-title lh-base">{title}</h5>
        {text && (
          <p
            className={`card-text lh-base heading ${
              isGradientOrCustom ? "text-light" : ""
            }`}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
