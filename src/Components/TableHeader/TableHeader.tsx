// TableHeader.tsx
import React from "react";
import { IData } from "../../Layout";

interface TableHeaderProps {
  handleSelectAll: () => void;
  selectedRows: number[];
  currentPageData: IData[];
}

const TableHeader: React.FC<TableHeaderProps> = ({
  handleSelectAll,
  selectedRows,
  currentPageData,
}) => (
  <thead>
    <tr>
      <th className="checkbox">
        <input
          type="checkbox"
          checked={
            selectedRows.length === currentPageData.length &&
            currentPageData.length > 0
          }
          onChange={handleSelectAll}
        />
      </th>
      <th className="name">Name</th>
      <th className="email">Email</th>
      <th className="role">Role</th>
      <th className="actions">Edit</th>
      <th className="actionss">Delete</th>
    </tr>
  </thead>
);

export default TableHeader;
