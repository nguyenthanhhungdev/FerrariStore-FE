import { Chip } from "@material-tailwind/react";

interface Props {
  header: string;
  content: string[];
  onContainerClick: (item: string) => void;
}

const InformationContainer = ({ header, content, onContainerClick }: Props) => {
  return (
    <div className="category flex-col flex-wrap gap-x-4 gap-y-2">
      <h3 className="text-lg font-bold text-white mb-2">{header}:</h3>
      {content.map((item) => (
        <Chip
          className="inline-flex"
          key={item}
          variant="gradient"
          value={item}
          color="gray"
          onClick={() => onContainerClick(item)}
          size="sm"
        />
      ))}
    </div>
  );
};

export default InformationContainer;
