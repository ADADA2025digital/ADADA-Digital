import React from "react";

const WhyWorkWithUsCard = ({ imgSrc, title, description }) => {
  return (
    <div className="w-100 py-md-4 py-2 d-flex">
      <div
        className="card custom-card bg-transparent rounded-4 p-4 d-flex flex-column w-100 h-100"
        style={{ border: "1px solid #2f2e2e" }}
      >
        <img
          src={imgSrc}
          className="card-img-top mx-auto"
          alt={title}
          style={{ height: "50px", width: "auto" }}
        />

        <div className="card-body text-center d-flex flex-column">
          <h4 className="card-title lh-base text-white fw-bold">{title}</h4>

          <p className="card-text lh-base heading text-white text-center flex-grow-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyWorkWithUsCard;
