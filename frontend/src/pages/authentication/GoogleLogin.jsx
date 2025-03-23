import { useGoogleLogin } from "@react-oauth/google";
import authService from "@/services/authService";
import { useNavigate } from 'react-router-dom';

import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const GoolgeLogin = () => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                const result = await authService.googleAuth(authResult.code);
                const obj = { ...result.user, token: result.token };
                localStorage.setItem('user-info', JSON.stringify(obj));
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