import { useState, forwardRef, useImperativeHandle, useRef } from "react";

export interface ConfirmationModalRef {
  showModal: () => void;
  hideModal: () => void;
}

interface ConfirmationModalProps {
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
}

const ConfirmationModal = forwardRef<ConfirmationModalRef, ConfirmationModalProps>(
  ({ onConfirm, title, message }, ref) => {
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      showModal: () => modalRef.current?.showModal(),
      hideModal: () => modalRef.current?.close(),
    }));

    const handleConfirm = async () => {
      setLoading(true);
      await onConfirm();
      setLoading(false);
      modalRef.current?.close();
    };

    return (
      <dialog ref={modalRef} className="modal backdrop-blur-sm">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-purple-700">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="btn btn-soft btn-error"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);

export default ConfirmationModal;
