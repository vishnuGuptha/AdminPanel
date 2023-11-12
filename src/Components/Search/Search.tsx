import { FC } from "react";
import "./search.css";

interface ISearchProps {
  searchTerm?: string;
  setSearchTerm: (val: string) => void;
}

const Search: FC<ISearchProps> = (props) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <input
      className="--search-input"
      type={"text"}
      placeholder="Search by name email or role"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default Search;
