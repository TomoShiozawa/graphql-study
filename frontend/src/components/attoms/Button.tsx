type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  onClick,
  children,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-800 transition-colors duration-200"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
