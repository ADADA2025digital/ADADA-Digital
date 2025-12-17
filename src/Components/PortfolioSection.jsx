import React from "react";
import ContentHeader from "./ContentHeader";

const PortfolioSection = ({ data = [] }) => {
  return (
    <section className="portfolio py-5 mt-5">
      <div className="container">
        <ContentHeader
          title="Showcasing Our Digital\nSuccess Stories"
          subtitle="Our Case Studies"
          description="Explore our collection of innovative digital projects, highlighting our expertise in crafting custom solutions that drive measurable success for clients."
          buttonPath="/portfolio"
        />

        <div className="row">
          {data.map((item, index) => (
            <div
              className="col-md-6 portfolio-content position-relative overflow-hidden rounded-2 mb-5"
              key={index}
            >
              <div className="portfolio-img">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid w-100 d-block h-auto"
                />
              </div>
              <div className="text-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center text-white z-2">
                <div className="overlay-header">
                  <h2 className="fw-bold text-white m-0">{item.title}</h2>
                  <div className="highlight fw-semibold mt-1">
                    {item.subheading}
                  </div>
                </div>
                <div className="portfolio-description heading px-md-5 px-2 position-relative z-1">
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
