import React from 'react';
import {InputField} from "../FormControls/controls";
import {SearchBarStyles} from "./SearchBarStyles";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = (props) => {
    const {handleSearch, title} = props;
    const styles = SearchBarStyles();

    return (
        <InputField
            label={title}
            className={styles.searchInput}
            inputIcon={<SearchOutlinedIcon />}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;