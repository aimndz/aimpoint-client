import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Header from "../Header";
import parse from "html-react-parser";

const TinyMCE_URL = import.meta.env.VITE_TINYMCE_API_KEY;

// TypeScript version of the AdminDashboard component
function ContentEditor() {
  // Create a reference for the TinyMCE editor with the correct type
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState("");

  // Function to log the content of the editor
  const logContent = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      <Header />
      <Editor
        apiKey={TinyMCE_URL}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            "checklist",
            "mediaembed",
            "casechange",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "ai",
            "mentions",
            "tinycomments",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
          ],
          skin: "oxide-dark",
          content_css: "dark",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue="Welcome to TinyMCE!"
      />
      <button onClick={logContent}>Log Content</button>

      <br />
      <div>
        <h2>Content:</h2>
        <div>{parse(content)}</div>
      </div>
    </div>
  );
}

export default ContentEditor;
