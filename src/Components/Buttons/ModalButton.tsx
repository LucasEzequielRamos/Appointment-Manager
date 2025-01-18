'use client'
import React from "react";

interface ModalButtonProps {
  modalId: string;
  status: 'open' | 'closed';
  modalTitle: string;
  modalBody: string | React.ReactNode;
  labelPrimaryBtn?: string;
  onPrimaryAction?: (...args: any[]) => void; 
  labelSecondaryBtn?: string;
  onSecondaryAction?: (...args: any[]) => void;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  modalId,
  status,
  modalTitle,
  modalBody,
  labelPrimaryBtn,
  onPrimaryAction,
  labelSecondaryBtn,
  onSecondaryAction,
}) => {
  React.useEffect(() => {
    console.log('status', status);
    if (status === 'open') {
      openModal();
    } else {
      closeModal();
    }
  }, [status]);

  const openModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handlePrimaryAction = async (...args: any[]) => {
    if (onPrimaryAction) {
      await onPrimaryAction(...args);
    }
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{modalTitle}</h3>
        <div className="py-4">{modalBody}</div>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handlePrimaryAction}
          >
            {labelPrimaryBtn}
          </button>
          {labelSecondaryBtn && (
            <button
              className="btn btn-secondary"
              onClick={onSecondaryAction}
            >
              {labelSecondaryBtn}
            </button>
          )}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalButton;
