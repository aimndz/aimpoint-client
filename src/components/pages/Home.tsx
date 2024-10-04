import { useState, useEffect } from "react";
import formatDate from "../../utils/formatDate";

import Header from "../Header";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  _count: {
    Comment: number;
  };
};

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

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
    fetchPosts();
  }, []);

  return (
    <>
      <div className="mx-auto">
        <Header />
        <h1 className="text-3xl font-semibold my-5">
          Blogs <span className="font-normal">({posts.length})</span>
        </h1>
        <main>
          <ul className="grid grid-cols-3 gap-3">
            {posts.map((post: Post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <div className="bg-primary-800 p-3 rounded-lg border border-solid border-primary-300">
                    <span className="text-primary-200 text-sm">
                      {formatDate(post.publishedAt)}
                    </span>
                    <h1 className="text-accent-100 text-2xl font-semibold ">
                      {post.title}
                    </h1>
                    <p className="text-primary-200">{post.content}</p>
                    <p className="text-primary-200 mt-3 text-sm">
                      {post._count.Comment} comments
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default Home;
