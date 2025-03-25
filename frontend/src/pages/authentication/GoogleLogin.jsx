import { useGoogleLogin } from "@react-oauth/google";
import authService from "@/services/authService";
import { useNavigate } from 'react-router-dom';

import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

// Redux
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@/redux/slices/userSlice";

const GoolgeLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                const result = await authService.googleLogin(authResult.code);

                // Set User details here
                dispatch(setUser(result.user));

                // set Token here
                dispatch(setToken(result.token));

                navigate('/dashboard');
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log('Error while Google Login...', e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <motion.button
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => googleLogin()}
        >
            <FaGoogle className="text-red-500 text-xl" />
        </motion.button>
    );
};

export default GoolgeLogin;