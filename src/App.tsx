import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import checkTokenExpiration from "./utils/checkTokenExp";

import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Post from "./components/Post";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const isTokenExpired = checkTokenExpiration();

    if (isTokenExpired) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
