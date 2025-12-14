import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuthStore } from "../store/authStore";

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: validate credentials later
    login();
    navigate("/projects");
  };

  const handleGoogleSignIn = () => {
    // TODO: wire Google OAuth later
    login();
    navigate("/projects");
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
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign in
          </Button>

          <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}


// export function Login() {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="max-w-sm w-full p-4">
//         <h1 className="text-xl font-semibold mb-2">Login</h1>
//         <p className="text-sm text-muted-foreground">
//           Placeholder login screen. We will add mobile number + OTP UI later.
//         </p>
//       </div>
//     </div>
//   );
// }
