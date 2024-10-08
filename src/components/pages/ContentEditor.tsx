import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../Header";
import Input from "../Input";
import Button from "../Button";
import { useNavigate, useParams } from "react-router-dom";

const TinyMCE_URL = import.meta.env.VITE_TINYMCE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

// TypeScript version of the AdminDashboard component
function ContentEditor() {
  const { id } = useParams();
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      setTitle(data.title);
      setContent(data.content);
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEditing = id ? true : false;
    const method = isEditing ? "PUT" : "POST";

    const apiEndpoint = isEditing ? `${apiUrl}/posts/${id}` : `${apiUrl}/posts`;

    const res = await fetch(apiEndpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.msg);
      return;
    }

    await res.json();

    navigate("/");
  };

  return (
    <div>
      <Header />
      <form method="POST" className="space-y-3" onSubmit={handleSubmit}>
        <Input
          id="title"
          name="title"
          label="Title"
          placeholder="Enter a title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Content</h2>
        <Editor
          apiKey={TinyMCE_URL}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={content}
          onEditorChange={(content) => setContent(content)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            skin: "oxide-dark",
            content_css: "dark",
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: `
              body { font-family:Montserrat,Arial,sans-serif; font-size:14px; } }
            `,
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-accent-100 text-primary-800 font-semibold"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContentEditor;
