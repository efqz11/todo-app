import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
          {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="mt-4 flex justify-end">
                <button
                onClick={onCancel}
                className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                {cancelLabel}
                </button>
                <button
                onClick={onConfirm}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                {confirmLabel}
                </button>
            </div>
            </div>
        </div>
      </>
  );
};
