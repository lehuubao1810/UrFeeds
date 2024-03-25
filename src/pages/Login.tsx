import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginWithGoogle,
  loginWithGithub,
} from "../redux/auth.slice";

import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {status} = useSelector((state: RootState) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    if (status === "succeeded") {
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    await dispatch(loginWithGoogle());
    if (status === "succeeded") {

      navigate("/");
    }
  };

  const handleGithubLogin = async () => {
    await dispatch(loginWithGithub());
    if (status === "succeeded") {
      navigate("/");
    }
  };


  return (
    <div className="flex items-center justify-around h-screen container">
      <div className="w-96 p-6 border border-gray-300 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-12 ">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
        <div className="text-center mt-4 text-sm font-bold">or login with</div>
        <div className="flex justify-center mt-4">
          <div className="p-2 rounded-md mr-2">
            <img
              src="./gg_icon.png"
              alt="google"
              onClick={handleGoogleLogin}
              className="cursor-pointer h-8 w-8 hover:opacity-90 hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
          <div className="p-2 rounded-md mr-2">
            <img
              src="./github_icon.png"
              alt="github"
              onClick={handleGithubLogin}
              className="cursor-pointer h-8 w-8 hover:opacity-90 hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
