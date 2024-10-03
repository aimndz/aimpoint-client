type InputProps = {
  id: string;
  type: string;
  name: string;
  value: string;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  type,
  value,
  name,
  label,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="text-primary-100 bg-primary-800 p-3 border border-solid border-primary-300 rounded-lg placeholder-primary-200"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
