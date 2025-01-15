import React from "react";

interface ModalButtonProps {
  buttonLabel: string;
  modalTitle: string;
  modalBody: string | React.ReactNode;
  onPrimaryAction?: (...args: any[]) => Promise<void>; // Callback asíncrono
}

const ModalButton: React.FC<ModalButtonProps> = ({
  buttonLabel,
  modalTitle,
  modalBody,
  onPrimaryAction,
}) => {
  const modalId = `modal_${Math.random().toString(36).slice(2, 11)}`;

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
    <>
      <button className="btn" onClick={openModal}>
        {buttonLabel}
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <div className="py-4">{modalBody}</div>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={handlePrimaryAction} 
            >
              Aceptar
            </button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalButton;
 