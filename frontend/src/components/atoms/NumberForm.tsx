type NumberFormProps = {
  label: string;
  placeholder: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
};

const NumberForm = (props: NumberFormProps) => {
  const { label, placeholder, id, onChange, value, min, max, step } = props;

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
        type="number"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default NumberForm;
