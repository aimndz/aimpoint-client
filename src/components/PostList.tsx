import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import parse from "html-react-parser";

type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  _count: {
    Comment: number;
  };
};

type PostListProps = {
  filteredPosts: Post[];
};

const PostList = ({ filteredPosts }: PostListProps) => {
  return (
    <>
      {filteredPosts.map((post) => {
        // Split the content into words and get the first 10
        const contentWords = post.content.split(" ").slice(0, 10).join(" ");
        // Append ellipsis if the content has more than 10 words
        const truncatedContent =
          post.content.split(" ").length > 10
            ? `${contentWords}...`
            : contentWords;

        return (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div className="bg-primary-800 p-3 rounded-lg border border-solid border-primary-300">
                <span className="text-primary-200 text-sm">
                  {post.publishedAt
                    ? formatDate(post.publishedAt)
                    : "Unpublished"}
                </span>
                <h1 className="text-accent-100 text-2xl font-semibold ">
                  {post.title}
                </h1>
                <div className="text-primary-200">
                  {parse(truncatedContent)}
                </div>
                <p className="text-primary-200 mt-3 text-sm">
                  {post._count.Comment} comments
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default PostList;
