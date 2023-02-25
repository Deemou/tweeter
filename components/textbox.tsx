import cls from "@libs/client/utils";
interface TextboxProps {
  text?: string;
  textSize?: string;
}
export default function Textbox({ text, textSize }: TextboxProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col overflow-hidden pt-2">
        <div className={cls(`${textSize} mt-1 break-words font-medium`)}>
          {text}
        </div>
      </div>
    </div>
  );
}
