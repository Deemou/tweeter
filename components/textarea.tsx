interface TextAreaProps {
  name?: string;
  [key: string]: any;
}

export default function TextArea({ name, ...rest }: TextAreaProps) {
  return (
    <div>
      <span
        id={name}
        {...rest}
        role="textbox"
        contentEditable
        className="block w-full rounded-md bg-white px-2 py-3 text-xl font-medium leading-none empty:text-slate-500 empty:before:content-[attr(placeholder)] focus:border-orange-500 focus:ring-orange-500"
      ></span>
    </div>
  );
}

TextArea.defaultProps = {
  name: "",
};
