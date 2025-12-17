import React from "react";

const ImageComponent = ({ alt, src, className }) => {
  return <img alt={alt} src={src} className={className} />;
};

export default ImageComponent;
