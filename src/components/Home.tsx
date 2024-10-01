import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import formatDate from "../utils/formatDate";
import Button from "./Button";

const apiUrl = import.meta.env.VITE_API_URL;

type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

type DecodedToken = {
  username: string;
};

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPosts(data);
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUsername(decoded.username);
    }

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
  };

  return (
    <>
      <div className="mx-auto">
        <nav className="flex justify-between items-center py-3">
          <div>
            <p className="font-bold text-xl text-accent-100">
              <a href="/">⦾ AimPoint</a>
            </p>
          </div>
          <ul>
            <li>
              {username ? (
                <div className="space-x-3">
                  <span className="text-accent-100">Hello, {username}!</span>
                  <Button className="bg-primary-800" onClick={handleLogout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <Button href="/login" className="bg-primary-800">
                  Login
                </Button>
              )}
            </li>
          </ul>
        </nav>
        <main>
          <ul className="grid grid-cols-3 gap-3">
            {posts.map((post: Post) => (
              <li key={post.id}>
                <div className="bg-primary-800 p-3 rounded-lg border border-solid border-primary-300">
                  <span className="text-primary-200">
                    {formatDate(post.publishedAt)}
                  </span>
                  <h1 className="text-accent-100 text-2xl font-semibold ">
                    {post.title}
                  </h1>
                  <p className="text-primary-200">{post.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default Home;
