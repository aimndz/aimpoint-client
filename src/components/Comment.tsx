import formatDate from "../utils/formatDate";

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
  onDelete: (id: string) => void;
  onShowEdit: (id: string) => void;
};

function Comment({
  comment,
  loggedInUser,
  onShowEdit,
  onDelete,
}: CommentProps) {
  return (
    <div className="border border-solid border-primary-300 p-3 rounded-lg mt-5 flex justify-between">
      <div>
        <p className="text-primary-200 text-sm">
          <span className="font-bold">{comment.user?.username}</span> •{" "}
          <span>{formatDate(comment.createdAt)}</span>
        </p>
        {/* <Input value={comment.text} /> */}
        <p className="text-primary-100">{comment.text}</p>
      </div>
      {comment.user.id === loggedInUser?.id ? (
        <div className="flex gap-3">
          <button
            className="text-sm hover:underline"
            onClick={() => onShowEdit(comment.id)}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-600 hover:underline"
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
