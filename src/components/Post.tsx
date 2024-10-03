import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import formatDate from "../utils/formatDate";

import Header from "./Header";
import Button from "./Button";
import Comment from "./Comment";
import EditComment from "./EditComment";

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
    id: string;
    username: string;
  };
};

type DecodedToken = {
  id: string;
  username: string;
};

const Post = () => {
  const { id } = useParams();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState("");
  const [editingId, setEditingId] = useState("");
  const navigate = useNavigate();

  // Get username from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUser({ id: decoded.id, username: decoded.username });
    }
  }, []);

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

  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${apiUrl}/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ text: userComment, id: id, userId: user?.id }),
    });

    if (res.status === 401) {
      // Redirect to login if not authenticated
      navigate("/login");
    }

    if (res.ok) {
      const data = await res.json();

      const newComment = {
        ...data,
        user: { id: user?.id, username: user?.username },
      };

      setComments([...comments, newComment]);
      setUserComment("");
    }
  };

  const handleDelete = async (commentId: string) => {
    const res = await fetch(`${apiUrl}/posts/${id}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 401) {
      // Redirect to login if not authenticated
      navigate("/login");
    }

    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const handleShowEdit = (commentId: string) => {
    setEditingId(commentId);
  };

  const handleCancel = () => {
    setEditingId("");
  };

  const handleSaveEdit = async (commentId: string, text: string) => {
    try {
      const res = await fetch(`${apiUrl}/posts/${id}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("Failed to update comment");
      }

      const data = await res.json();

      const updatedComment = {
        ...data,
        user: { id: user?.id, username: user?.username },
      };

      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? updatedComment : comment
      );

      setComments(updatedComments);
      setEditingId("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

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
        <div className="py-10">
          <h2 className="text-primary-100 font-bold text-xl">
            {`${comments?.length} Comments`}
          </h2>
          <div>
            <form action="POST" onSubmit={handleSubmitComment}>
              <textarea
                name="comment"
                id="comment"
                placeholder="Add a comment..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full text-primary-100 bg-primary-800 p-3 border border-solid border-primary-300 rounded-lg placeholder-primary-200"
              ></textarea>
              <Button type="submit">Comment</Button>
            </form>
            {comments.length > 0 &&
              comments.map((comment) =>
                editingId === comment.id ? (
                  <EditComment
                    key={comment.id}
                    comment={comment}
                    loggedInUser={user ?? { id: "", username: "" }}
                    onCancel={handleCancel}
                    onSaveEdit={handleSaveEdit}
                  />
                ) : (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    loggedInUser={user ?? { id: "", username: "" }}
                    onDelete={handleDelete}
                    onShowEdit={handleShowEdit}
                  />
                )
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Post;
