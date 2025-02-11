import { useState } from "react";
import { X } from "lucide-react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
}

const Alert = ({ message, type = "info" }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${typeClasses[type]} z-[9999]`}
    >
      <span>{message}</span>
      <button onClick={() => setVisible(false)} className="ml-2">
        <X size={18} />
      </button>
    </div>
  );
};

export default Alert;
