import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Header from "../Header";
import Button from "../Button";
import PostList from "../PostList";
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

type DecodedToken = {
  user: {
    id: string;
    username: string;
    role: string;
  };
};

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("published");
  const [user, setUser] = useState<DecodedToken["user"] | null>(null);

  const filteredPosts = posts.filter((post) =>
    filter === "published" ? post.publishedAt : !post.publishedAt
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser(decoded.user);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${apiUrl}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSetFilter = () => {
    if (filter === "published") {
      setFilter("unpublished");
    } else {
      setFilter("published");
    }
  };

  return (
    <>
      <div className="mx-auto">
        <Header />
        <h1 className="text-3xl font-semibold my-5">
          Blogs <span className="font-normal">({posts.length})</span>
        </h1>
        {user?.role === "ADMIN" && (
          <div className="flex justify-between">
            <div className="space-x-3 mb-3">
              <Button
                className={filter === "published" ? "bg-primary-800" : ""}
                onClick={handleSetFilter}
              >
                Published
              </Button>
              <Button
                className={filter === "unpublished" ? "bg-primary-800" : ""}
                onClick={handleSetFilter}
              >
                Unpublished
              </Button>
            </div>
            <Link to="create">
              <Button className="bg-primary-800">+ Create</Button>
            </Link>
          </div>
        )}

        <main>
          <ul className="grid grid-cols-3 gap-3">
            <PostList filteredPosts={filteredPosts} />
          </ul>
        </main>
      </div>
    </>
  );
}

export default Home;
