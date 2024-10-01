import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";

import Header from "./Header";
import Button from "./Button";

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

type Comment = {
  id: string;
  text: string;
  createdAt: string;
  user: {
    username: string;
  };
};

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch post by id
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${apiUrl}/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${apiUrl}/posts/${id}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setComments(data);
    };

    fetchPost();
  }, [id]);

  // Set document title
  useEffect(() => {
    if (post?.title) {
      document.title = `Aim Point | ${post.title}`;
    }
  }, [post?.title]);

  return (
    <div>
      <Header />
      <main className="mt-10">
        <p className="italic text-primary-200 text-sm">
          {post?.publishedAt && formatDate(post?.publishedAt)}
        </p>
        <h1 className="text-accent-100 font-bold text-3xl mb-10">
          {post?.title}
        </h1>
        <p>{post?.content}</p>
        <div className=" py-10">
          <h2 className="text-primary-100 font-bold text-xl">
            {`${post?._count.Comment} Comments`}
          </h2>
          <ul>
            <form action="">
              <textarea
                name="comment"
                id="comment"
                placeholder="Add a comment..."
                className="w-full text-primary-100 bg-primary-800 p-3 border border-solid border-primary-300 rounded-lg placeholder-primary-200"
              ></textarea>
              <Button>Comment</Button>
            </form>
            {comments.length > 0 &&
              comments.map((comment) => (
                <li
                  key={comment.id}
                  className="border border-solid border-primary-300 p-3 rounded-lg mt-5"
                >
                  <p className="text-primary-200 text-sm">
                    <span className="font-bold">{comment.user.username}</span> •{" "}
                    <span>{formatDate(comment.createdAt)}</span>
                  </p>
                  <p className="text-primary-100">{comment.text}</p>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Post;
