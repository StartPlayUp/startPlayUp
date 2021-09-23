import React from "react";
import PropTypes from "prop-types";

const Assets = ({ items }) => {
    return (
        <div>
            <p>I am an assets modules</p>
            <ul>
                {items.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

Assets.propTypes = {
    items: PropTypes.array
};

export default Assets;
