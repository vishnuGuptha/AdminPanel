import { FC, useEffect, useState } from "react";
import "./EditPopup.css";
import { IData } from "../../Layout";

interface EditPopupProps {
  editingRow: IData | null;
  onSave: () => void;
  onCancel: () => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  setIsEditing: (value: boolean) => void;
}

const EditPopup: FC<EditPopupProps> = ({
  editingRow,
  onSave,
  onCancel,
  onNameChange,
  onEmailChange,
  onRoleChange,
  setIsEditing,
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!editingRow && closing) {
      const timeoutId = setTimeout(() => {
        setClosing(false);
        onCancel();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [editingRow, closing, onCancel]);

  return (
    <div className={`--modal ${closing ? "--closing" : ""}`}>
      <div className="--modal-content">
        <h3>Edit User Info</h3>
        <form>
          <div className="--form-row">
            <label>Name:</label>
            <input
              type="text"
              value={editingRow?.name || ""}
              onChange={(e) => onNameChange(e.target.value)}
              autoFocus
            />
          </div>
          <div className="--form-row">
            <label>Email:</label>
            <input
              type="text"
              value={editingRow?.email || ""}
              onChange={(e) => onEmailChange(e.target.value)}
              autoFocus
            />
          </div>
          <div className="--form-row">
            <label>Role:</label>
            <input
              type="text"
              value={editingRow?.role || ""}
              onChange={(e) => onRoleChange(e.target.value)}
              autoFocus
            />
          </div>
          <button type="button" onClick={onSave}>
            Save
          </button>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
