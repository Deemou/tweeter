import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <span
        id={name}
        {...register}
        {...rest}
        role="textbox"
        contentEditable
        className="block w-full rounded-md bg-white px-2 py-3 text-xl font-medium leading-none empty:text-slate-500 empty:before:content-[attr(placeholder)] focus:border-orange-500 focus:ring-orange-500"
      ></span>
    </div>
  );
}

TextArea.defaultProps = {
  label: "",
  name: "",
};
