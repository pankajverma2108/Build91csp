import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import Alert from "@mui/material/Alert";
import { useAuthStore } from "../store/authStore";

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    if (token) {
      navigate("/projects");
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: validate credentials later (password login not enabled yet)
    login();
    navigate("/projects");
  };

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to Customer Portal
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {decodeURIComponent(error)}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            disabled
            helperText="Password login not enabled yet"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled
            helperText="Use Google login below"
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Link href="#" variant="body2" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </Link>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled
          >
            Sign in
          </Button>

          <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            size="large"
          >
            Continue with Google
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block", textAlign: "center" }}>
            Your Gmail must be registered by an administrator before you can log in.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
