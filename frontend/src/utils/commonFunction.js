import { toast } from "react-toastify";

function errorToast(message) {
    toast.error(message);
}

export default { errorToast };