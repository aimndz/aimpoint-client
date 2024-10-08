import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import checkTokenExpiration from "./utils/checkTokenExp";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Layout from "./components/Layout";
import Signup from "./components/pages/Signup";
import Post from "./components/pages/Post";
import { useEffect } from "react";
import ContentEditor from "./components/pages/ContentEditor";

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
          <Route path="/posts/:id/edit" element={<ContentEditor />} />
          <Route path="/create" element={<ContentEditor />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
