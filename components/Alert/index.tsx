import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const alertMessage = {
  info: (text:string) => toast.info(text),
  success: (text:string) => toast.success(text),
  warning: (text:string) => toast.warning(text),
  error: (text:string) => toast.error(text),
};

const Alert = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      theme="dark"
    />
  );
};

export { Alert, alertMessage };
