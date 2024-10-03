import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

type CommentProps = {
  comment: {
    id: string;
    text: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
    };
  };
  loggedInUser: {
    id: string;
    username: string;
  };
  onCancel: () => void;
  onSaveEdit: (id: string, text: string) => void;
};

function EditComment({ comment, onCancel, onSaveEdit }: CommentProps) {
  const [editedComment, setEditedComment] = useState(comment.text);

  return (
    <div className="border border-solid border-primary-300 p-3 rounded-lg mt-5">
      <Input
        id="editComment"
        type="text"
        label=""
        name="editComment"
        placeholder="Edit your comment..."
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
      />
      <div className="mt-3 space-x-3">
        <Button className="text-primary-100" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="bg-primary-800"
          onClick={() => onSaveEdit(comment.id, editedComment)}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default EditComment;
