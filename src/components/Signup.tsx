import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "./Input";
import Button from "./Button";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;

    setError("");
    const res = await fetch(`${apiUrl}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      setError(errorData.msg);
    }

    const data = await res.json();
    const { token } = data;

    localStorage.setItem("token", token);
    navigate("/");
  };

  const handleSetFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleSetLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSetConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-3xl text-accent-100 mb-10">
        <Link to="/">⦾ AimPoint</Link>
      </h1>
      <h2 className="font-bold text-2xl">Signup</h2>
      <form
        method="POST"
        onSubmit={handleLogin}
        className="space-y-3 w-full max-w-96"
      >
        <Input
          id="first-name"
          label="First name"
          value={firstName}
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          onChange={handleSetFirstName}
        />
        <Input
          id="last-name"
          label="Last name"
          value={lastName}
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          onChange={handleSetLastName}
        />
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
        <Input
          id="confirmPassword"
          label="Conirm password"
          value={confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          onChange={handleSetConfirmPassword}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="bg-accent-100 w-full text-primary-900 font-semibold"
        >
          Sign up
        </Button>
      </form>
      <Link to="/login" className="mt-3 text-primary-200 hover:underline">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Signup;
