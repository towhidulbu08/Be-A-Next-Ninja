"use client";

const Button = () => {
  return (
    <button
      onClick={() => {
        console.log("button Click");
      }}
    >
      <p> Click</p>
    </button>
  );
};

export default Button;
