import React from "react";

const InfoCard = ({ data }) => {
  return (
    <div className="info-card text-white p-md-5 p-3 rounded-4 w-100 text-md-start text-center col-md-3">
      {data.map((item, index) => (
        <div key={index}>
          <h1>{item.number}</h1>
          <h4 className="fw-bold">{item.title}</h4>
          <p
            className="lh-base heading text-md-start text-center"
            style={{ textAlign: "justify" }}
          >
            {item.description}
          </p>
          {index !== data.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
