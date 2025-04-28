import React, { Fragment } from 'react';

const Table = ({
    data = [], columns = [], ...props
}) => {
    return (
        <Fragment>
            <table className=" w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    {columns.length > 0 ? <tr>
                        {columns.map((column) => {
                            return (
                                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    {column.title}
                                </th>
                            )
                        })}
                    </tr> :
                        <>{props.children}</>
                    }
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((item) => {
                        return (
                            <tr key={item.id}>
                                {columns.map((column) => {
                                    return (
                                        <td
                                            key={`${column.key}`}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                        >
                                            {column.render ? column.render(item) : item[column.field]}
                                        </td>)
                                })}
                            </tr>)
                    })}
                </tbody>
            </table>

        </Fragment>

    );
};

export default Table;