type InputProps = {
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  disabled = false,
  onChange,
}: InputProps) {
  return (
    <label className="ui-input">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}