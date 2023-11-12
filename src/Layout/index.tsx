import { useState, useEffect } from "react";
import "./index.css";
import "./index.css";
import Search from "../Components/Search/Search.tsx";
import EditPopup from "../Components/EditPopup/EditPopup.tsx";
import TableHeader from "../Components/TableHeader/TableHeader.tsx";
import TableRow from "../Components/TableRow/TableRow.tsx";
import TableFooter from "../Components/TableFooter/TableFooter.tsx";

export interface IData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Table = () => {
  const [data, setData] = useState<IData[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingRow, setEditingRow] = useState<IData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const itemsPerPage = 10;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (res.ok) {
          const jsonData: IData[] = await res.json();
          setData(jsonData);
        } else {
          console.error(`Failed to fetch data. Status: ${res.status}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    const rowToEdit = data.find((item) => item.id === id);
    rowToEdit && setEditingRow(rowToEdit);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingRow) {
      const updatedData = data.map((item) =>
        item.id === editingRow.id ? { ...item, ...editingRow } : item
      );
      setData(updatedData);
      setEditingRow(null);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting row with id ${id}`);
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setSelectedRows((prevSelected) =>
      prevSelected.filter((rowId) => rowId !== id)
    );
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === currentPageData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentPageData.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    const newData = data.filter((item) => !selectedRows.includes(item.id));
    setData(newData);
    setSelectedRows([]);
  };

  const filteredData = data.filter(
    (item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="--page-container">
      <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <table className="--main-data-table">
        <TableHeader
          handleSelectAll={handleSelectAll}
          selectedRows={selectedRows}
          currentPageData={currentPageData}
        />
        <tbody>
          {currentPageData.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              selectedRows={selectedRows}
              handleCheckboxChange={handleCheckboxChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {isEditing && (
        <EditPopup
          editingRow={editingRow}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          setIsEditing={setIsEditing}
          onNameChange={(value) =>
            setEditingRow((prev) => ({ ...prev!, name: value }))
          }
          onEmailChange={(value) =>
            setEditingRow((prev) => ({ ...prev!, email: value }))
          }
          onRoleChange={(value) =>
            setEditingRow((prev) => ({ ...prev!, role: value }))
          }
        />
      )}
      <TableFooter
        handleDeleteSelected={handleDeleteSelected}
        selectedRows={selectedRows}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
