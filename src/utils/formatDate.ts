import { formatDistanceToNow, format } from "date-fns";

const formatDate = (publishedDate: Date | string) => {
  const date = new Date(publishedDate);
  const now = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = now.getTime() - date.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

  // If the date is published within 1 week (Ex. 1 day ago, 2 days ago, etc.)
  if (differenceInDays < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // If the post is published over 1 week (Ex. Sep 1, 2024)
  return format(date, "MMM/dd/yyyy");
};

export default formatDate;
