import React from "react";

const ErrorUi = ({ error }) => {
  return (
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-lg font-semibold text-red-600">
          Something went wrong
        </h2>

        <p className="text-gray-600 mt-2">{error.message}</p>
      </div>
    </div>
  );
};

export default ErrorUi;
