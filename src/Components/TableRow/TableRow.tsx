// TableRow.tsx
import React from "react";
import Edit from "../../assets/svg/Edit.tsx";
import Delete from "../../assets/svg/Delete";
import { IData } from "../../Layout/index.tsx";

interface TableRowProps {
  item: IData;
  selectedRows: number[];
  handleCheckboxChange: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  selectedRows,
  handleCheckboxChange,
  handleEdit,
  handleDelete,
}) => (
  <tr
    key={item.id}
    className={selectedRows.includes(item.id) ? "selected-row" : ""}
  >
    <td className="checkbox">
      <input
        type="checkbox"
        checked={selectedRows.includes(item.id)}
        onChange={() => handleCheckboxChange(item.id)}
      />
    </td>
    <td className="name">{item.name}</td>
    <td className="email">{item.email}</td>
    <td className="role">{item.role}</td>
    <td className="actions-edit" onClick={() => handleEdit(item.id)}>
      <Edit />
    </td>
    <td className="actions-delete" onClick={() => handleDelete(item.id)}>
      <Delete />
    </td>
  </tr>
);

export default TableRow;
