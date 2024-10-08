import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../Header";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const TinyMCE_URL = import.meta.env.VITE_TINYMCE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

// TypeScript version of the AdminDashboard component
function ContentEditor() {
  // Create a reference for the TinyMCE editor with the correct type
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${apiUrl}/posts`, {
      method: "POST",
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
          initialValue="<p>Enter your blog content here.</p>"
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
