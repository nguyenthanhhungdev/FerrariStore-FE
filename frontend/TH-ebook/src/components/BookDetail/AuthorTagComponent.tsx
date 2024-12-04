import { Chip } from "@material-tailwind/react";

interface Props {
  header?: string;
  content: string[];
  onContainerClick: (item: string) => void;
}

const AuthorTagComponent = ({ header, content, onContainerClick }: Props) => {
  return (
    <div className="flex-col flex-wrap gap-x-4 gap-y-2">
      {header && <h3 className="text-lg font-bold text-white mb-2">{header}:</h3>}
      <div className="">
          {content.map((item) => (
        <Chip
          className="inline-flex break-words"
          key={item}
          variant="gradient"
          value={item}
          color="gray"
          onClick={() => onContainerClick(item)}
          size="sm"
        />
      ))}
        </div>
    </div>
  );
};

export default AuthorTagComponent;
