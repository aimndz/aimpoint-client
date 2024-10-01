type Button = {
  href?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  href,
  type = "button",
  onClick,
  className,
  children,
}: Button) => {
  const baseClass =
    "px-6 py-3 text-accent-100 rounded-lg border border-solid border-primary-300";

  if (href) {
    return (
      <button className=" py-3">
        <a href={href} className={`${className} ${baseClass}`}>
          {children}
        </a>
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${baseClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
