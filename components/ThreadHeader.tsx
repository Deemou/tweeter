interface ThreadHeaderProps {
  name?: string;
  createdAt?: string;
}

export default function ThreadHeader({ name, createdAt }: ThreadHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="item-center flex space-x-3">
          <div className="h-8 w-8 rounded-md bg-red-400" />
          <h3 className="text-lg font-medium">{name}</h3>
        </div>
        <h3 className="font-medium">{createdAt?.slice(0, 10)}</h3>
      </div>
    </>
  );
}
