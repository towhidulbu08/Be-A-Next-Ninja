import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto ">
      AuthLayout
      {children}
    </div>
  );
};

export default AuthLayout;
