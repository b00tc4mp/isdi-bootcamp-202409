"use client";

export default function Alert({ message, level = "success", onAccepted }) {
  // Determina el color y el ícono según el nivel
  let borderColor, icon;

  if (level === "error") {
    borderColor = "border-red-500";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-red-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else {
    //  "success"
    borderColor = "border-green-500";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-green-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div
        className={`w-full max-w-md mx-4 p-6 bg-white rounded-md shadow-md flex flex-col items-center border-t-4 ${borderColor}`}>
        {icon}
        <p className="text-center text-gray-800 mb-4">{message}</p>
        <button onClick={onAccepted} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
          Aceptar
        </button>
      </div>
    </div>
  );
}
