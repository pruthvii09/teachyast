import React from "react";

const Dialog = ({ children, dialogOpen, setDialogOpen }) => {
  return (
    <div>
      {/* Black overlay */}
      <div
        onClick={() => setDialogOpen(false)}
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
      ></div>

      {/* Modal */}
      <div className="fixed top-0 left-0 px-5 w-full h-full flex justify-center items-center">
        <div className="px-10 py-5 sm:w-1/3 w-96 bg-[#1e1e1e] rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
