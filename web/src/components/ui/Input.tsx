type InputProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
};

export function Input({ label, type = "text", placeholder }: InputProps) {
  return (
    <label className="ui-input">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} />
    </label>
  );
}