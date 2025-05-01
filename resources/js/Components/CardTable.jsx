import React from 'react';

const CardTable = ({
    color = 'blue', ...props
}) => {
    return (
        <div className={`flex items-center border-l-2 border-${color}-200 dark:border-${color}-600`}>
            <div className="ml-4 ">
                {props.children}
            </div>
        </div>
    );
};

export default CardTable;