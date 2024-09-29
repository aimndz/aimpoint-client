import { useState, useEffect } from "react";
import formatDate from "./utils/formatDate";

const apiUrl = import.meta.env.VITE_API_URL;

interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkMDFmMzVhLWExYmEtNGFjNS05OGYwLTc0MWYzNzFkMWI5NSIsInVzZXJuYW1lIjoiYWltbmR6IiwiaWF0IjoxNzI3NTg3OTQ0LCJleHAiOjE3Mjc1OTE1NDR9.jildczaZsS0gScLxaa1X6sD306waHxYU4OSuGsPhbVs`,
        },
      });
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-primary-900 text-primary-100 font-montserrat h-screen">
      <div className="max-w-4xl mx-auto">
        <main className="mx-4">
          <div className="mx-auto">
            <nav className="flex justify-between items-center py-3">
              <div>
                <p className="font-bold text-xl text-accent-100 ">AimPoint</p>
              </div>
              <ul>
                <li>
                  <button className="bg-primary-800 text-accent-100 px-6 py-3 rounded-lg border border-solid border-primary-300 ">
                    Login
                  </button>
                </li>
              </ul>
            </nav>
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
