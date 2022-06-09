import React from "react";
import styles from "./Search.module.scss";
const Search = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className={styles.root}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="&#128269;Поиск пиццы..."
      />
    </div>
  );
};

export default Search;
