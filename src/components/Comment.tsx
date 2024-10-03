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
};

function Comment({ comment }: CommentProps) {
  return (
    <div className="border border-solid border-primary-300 p-3 rounded-lg mt-5 flex justify-between">
      <div>
        <p className="text-primary-200 text-sm">
          <span className="font-bold">{comment.user?.username}</span> •{" "}
          <span>{formatDate(comment.createdAt)}</span>
        </p>
        <p className="text-primary-100">{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;
