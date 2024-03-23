import { RouterProvider } from "react-router-dom";

import { router } from "./router";

export default function App() {
  // const isAuthenticated = false; // Thay đổi thành trạng thái đăng nhập thực tế

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
