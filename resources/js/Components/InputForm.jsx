import React, { Fragment } from 'react';

const InputForm = ({
    field, title, errors, data, setData, placeholder = '', inputType = 'text'
}) => {
    return (
        <Fragment>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {title}
            </label>
            <input
                id={field}
                type={inputType}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2
                            focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 dark:text-white`}
                value={data}
                onChange={(e) => setData(field, e.target.value)}
                placeholder={placeholder}
            />
            {errors && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors}</p>
            )}
        </Fragment>
    );
};

export default InputForm;