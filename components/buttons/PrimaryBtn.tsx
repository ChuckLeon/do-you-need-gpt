import React, { ReactNode } from "react";

interface IPrimaryBtn {
  children: ReactNode;
  onClick?: () => void;
}

export default function PrimaryBtn({ children, onClick }: IPrimaryBtn) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-gray-800 bg-indigo-200 rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    >
      {children}
    </button>
  );
}
