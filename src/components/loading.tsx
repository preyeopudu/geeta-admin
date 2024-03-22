import { useSelector } from "react-redux";
import { RootState } from "../features/app_slice";

const Loading = () => {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed flex top-0 left-0 w-full bg-white justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-900"></div>
    </div>
  );
};

export default Loading;
