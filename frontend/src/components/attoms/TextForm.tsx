type TextFormProps = {
  label: string;
  placeholder: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextForm = ({ label, placeholder, id, onChange }: TextFormProps) => {
  return (
    <div className="w-100% p-2">
      <label
        className="block text-gray-200 text-sm font-bold mb-2"
        htmlFor={id ?? label}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        id={id ?? label}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextForm;
