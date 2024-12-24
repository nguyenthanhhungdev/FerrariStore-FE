import { Typography } from "@mui/material";
import ReactLoading from "react-loading";
import { useCounter } from "react-timing-hooks";

export default function LoadingSpinner({
  isLoading,
}: {
  isLoading?: boolean;
  text?: string;
}) {
  const [counter] = useCounter({
    start: 0,
    interval: 100,
    stepSize: 0.1,
    startOnMount: true,
  });
  if (isLoading !== false) {
    // dark organe
    return (
      <div className="w-full flex flex-row gap-4 items-center justify-center">
        <ReactLoading type="spin" color="#DC582A" />
        <Typography variant="h4">
          Working on updates... ({counter.toFixed(1)}s)
        </Typography>
      </div>
    );
  }
}
