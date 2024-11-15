import parse from "html-react-parser";
import $ from "jquery";
import DOMPurify from "dompurify";
import useFetchData from "../../hooks/useFetchData";
import LoadingSpinner from "../_Common/LoadingSpinner";

export type ReaderProps = {
  bookId: number;
  volumeNth: number;
  pagePage: number;
};

const ReaderRenderer = ({
  bookId: id,
  volumeNth: vl,
  pagePage: pg,
}: ReaderProps) => {
  const lnk = `books/${id}/${vl}/${pg}`;
  const { data, isLoading, error } = useFetchData<string>(lnk, `reader:${lnk}`);
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }
  if (error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div id="reader" className="w-full">
      <Renderer data={data} />
    </div>
  );
};
const Renderer = ({ data }: { data: string | null | undefined }) => {
  if (!data) return <>Cannot load</>;
  // fix relative link to local files
  const dom = $(DOMPurify.sanitize(data));
  dom.find("[src]").attr("src", function () {
    const src = $(this).attr("src");
    if (!src?.startsWith("/content")) return `/content/1/${src}`;
  });
  return parse(dom.html());
};
export default ReaderRenderer;
