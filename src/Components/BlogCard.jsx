import React from "react";

const BlogCard = ({ image, category, title, description, author, date }) => {
  return (
    <div className="card rounded-4 bg-dark custom-card text-light border-0 mb-4">
      <div className="card-body">
        <img
          src={image}
          className="card-img-top mb-3"
          alt={title}
          style={{ borderRadius: "18px", height: "250px" }}
        />
        <span className="text-danger heading fw-bold">{category}</span>
        <h4 className="card-title lh-base fw-bold my-2">{title}</h4>
        <p className="card-text lh-base heading">{description}</p>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex align-items-center">
            <img
              src={author.image}
              alt={author.name}
              className="rounded-circle me-2"
              style={{ width: "35px", height: "35px" }}
            />
            <span>{author.name}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span>{date}</span>
            <i className="bi bi-arrow-down-right-circle text-end text-danger fs-4"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
