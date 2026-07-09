type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({ children, type = "button", onClick }: ButtonProps) {
  return (
    <button type={type} className="ui-button" onClick={onClick}>
      {children}
    </button>
  );
}