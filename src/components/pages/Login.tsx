import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;

    setError("");
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.msg);
    }

    const data = await res.json();
    const { token } = data;

    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-3xl text-accent-100 mb-10">
        <Link to="/">⦾ AimPoint</Link>
      </h1>
      <h2 className="font-bold text-2xl">Login</h2>
      <form
        method="POST"
        onSubmit={handleLogin}
        className="space-y-3 w-full max-w-96"
      >
        <Input
          id="username"
          label="Username"
          value={username}
          name="username"
          type="text"
          placeholder="Enter your username"
          onChange={handleSetUsername}
        />
        <Input
          id="password"
          label="Password"
          value={password}
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleSetPassword}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="bg-accent-100 w-full text-primary-900 font-semibold"
        >
          Login
        </Button>
      </form>
      <Link to="/sign-up" className="mt-3 text-primary-200 hover:underline">
        Don't have an account? Sign up
      </Link>
    </div>
  );
};

export default Login;
