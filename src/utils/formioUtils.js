const { deleteForm } = require('react-formio');

export const deleteFormIoForm = (dispatch, id, callback) => {
    dispatch(deleteForm('form', id, err => {
        if (err) {
            console.error(err);
        }

        if (callback) {
            callback(err);
        }
    }))
};
