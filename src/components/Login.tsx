import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      console.log(errorData);
      setError(errorData.msg);
    }

    const data = await res.json();
    const { token } = data;

    localStorage.setItem("token", token);
  };

  return (
    <>
      <form method="POST" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="border border-solid border-black"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Username</label>
        <input
          id="password"
          className="border border-solid border-black"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
