import React from 'react';

const Skeleton = ({ className, variant = "rect" }) => {
  const baseClasses = "shimmer";
  const variants = {
    rect: "rounded-lg",
    circle: "rounded-full",
    card: "rounded-[2rem]",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export default Skeleton;
