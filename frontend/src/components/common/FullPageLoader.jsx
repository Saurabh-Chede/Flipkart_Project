import { Spinner } from "../ui/spinner";

export default function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Spinner />
    </div>
  );
}
