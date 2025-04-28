import React from 'react';
import PropTypes from 'prop-types';

const Form = ({
    submit, cancel, processing, ...props
}) => {
    return (
        <form onSubmit={submit} className="space-y-4">
            {props.children}

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={cancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    Cancelar
                </button>

                <button
                    disabled={processing}
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
};

Form.propTypes = {};

export default Form;