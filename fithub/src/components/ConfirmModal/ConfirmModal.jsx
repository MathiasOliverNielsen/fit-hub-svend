import { Button } from "../Button/Button";
import "./ConfirmModal.scss";

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", loading = false }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onCancel} />
      <div className="confirm-modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <Button onClick={onCancel} variant="secondary" disabled={loading}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="primary" loading={loading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </>
  );
}
