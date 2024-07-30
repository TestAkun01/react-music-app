import { ToastContainer as OriginalToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <OriginalToastContainer
      className="lg:bottom-[80px] bottom-[140px]"
      position="bottom-left"
      autoClose={5000}
      closeOnClick
      theme="dark"
    />
  );
}
