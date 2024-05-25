import React from 'react';

export default function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
