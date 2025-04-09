import { toast } from 'react-toastify';

export const success = function (message) {
    toast.success(message);
};

export const error = function (message) {
    toast.error(message);
}

export default {
    success,
    error
};
