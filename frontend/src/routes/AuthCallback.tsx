import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import { useAuthStore } from "../store/authStore";

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      // Redirect to login with error message
      navigate(`/login?error=${error}`);
      return;
    }

    if (token) {
      // Save token
      localStorage.setItem("customer_token", token);
      
      // Update auth store
      login();
      
      // Redirect to projects
      navigate("/projects");
    } else {
      // No token, redirect to login
      navigate("/login?error=Authentication failed");
    }
  }, [searchParams, navigate, login]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.primary">
          Logging you in...
        </Typography>
      </Box>
    </Container>
  );
}
