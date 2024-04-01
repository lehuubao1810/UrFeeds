import { toast } from "react-toastify";


export const notify = (message: string, type: "success" | "error" | "warning" | "info") => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Boun
    style: {
      fontSize: '14px',
      maxWidth: '90%',
    }
  });
};
