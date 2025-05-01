import React from 'react';

const Select = ({
    option = {}, data, setData, field = '', title = '', subTitle = '', errors
}) => {


    return (
        <div>
            <label htmlFor={field}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</label>
            <select
                onChange={(e) => setData(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option value="">{subTitle}</option>
                {data.map((item, index) => {
                    return (
                        <option key={index} value={item.id}>{item[option.text]}</option>
                    )
                })}

            </select>
            {errors && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors}</p>
            )}
        </div>
    );
};

Select.propTypes = {};

export default Select;