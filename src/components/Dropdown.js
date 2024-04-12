import React, { useState, useEffect } from 'react';
import Select from "react-select";

//dropdown menu for given options, defaults to first option
//isSearchable for if searching makes sense
function Dropdown({ options }) {

    const [selected, setSelected] = useState(options[0]);

    const handleChange = (choice) => {
        setSelected(choice);
    };

    return (
        <div>
            <Select
                options={options}
                value={selected}
                onChange={handleChange}
            />
        </div>
    );
};

export default Dropdown;