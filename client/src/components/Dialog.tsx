import clsx from "clsx";
import React from "react";

interface Dialog {
  titulo: string;
  bgTitulo?: string;
  show: boolean;
  children?: React.ReactNode;
  onClose:()=>void;
}

const Dialog = ({ titulo, children, show = false, onClose ,bgTitulo="bg-white" }: Dialog) => {
  if (!show) return;
  return (
    <div className="fixed top-0 w-full h-full bg-[#0000005a] left-0">
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white w-sm max-h-80 rounded-xl shadow-lg">
        <div className={clsx("flex items-center justify-between p-2 rounded-t-xl text-white",bgTitulo)}>
          <p className="text-xl font-semibold">{titulo}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            onClick={onClose}
            className="w-6 h-6 fill-current cursor-pointer transition-[fill] hover:fill-gray-300 duration-150 ease-in-out"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Dialog;
