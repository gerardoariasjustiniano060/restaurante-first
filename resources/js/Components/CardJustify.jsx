import React from 'react';
import PropTypes from 'prop-types';

const CardJustify = ({
    ...props
}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            {props.children}
        </div>
    );
};

CardJustify.propTypes = {};

export default CardJustify;