import { useNavigate } from "react-router-dom";
// import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
import { Box, Button, Typography, Container } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "@/assets/styles/App.css";

// Firebase Configuration (Replace with your own config)
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, provider);
      // const user = result.user;
      // console.log("User Logged In:", user);
      localStorage.setItem('isAuthenticated', true);
      // TODO: Check if user is approved by Admin
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container className="login-container">
      <Box className="login-box">
        <Typography variant="h4" gutterBottom>Welcome to Property Hub</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Sign in with Google. Admin approval is required before access.
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          className="google-button"
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
