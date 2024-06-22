import Toast from "react-native-toast-message";

interface ToastProps {
  type: "info" | "error" | "success";
  title: string;
  description: string;
}

export const showToast = ({ type, title, description }: ToastProps) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
  });
};
