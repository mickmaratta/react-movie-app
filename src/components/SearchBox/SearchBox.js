import React from 'react';
import './searchBox.css'

const SearchBox = ({searchValue, setSearchValue}) => {
    return (
        <div className='col col-sm-4 input-group input-group-lg'>
            <input 
                className='form-control search' 
                placeholder="Type to search..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
            ></input>
        </div>
    )
};

export default SearchBox;