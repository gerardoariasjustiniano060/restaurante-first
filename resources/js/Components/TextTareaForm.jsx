import React, { Fragment } from 'react';

const TextTareaForm = ({
    field, title, errors, data, setData, rows = 3
}) => {
    return (
        <Fragment>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {title}
            </label>
            <textarea
                name={field}
                value={data}
                onChange={(e) => setData(field, e.target.value)}
                rows={rows}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
            />
            {errors && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors}</p>
            )}
        </Fragment>
    );
};

export default TextTareaForm;