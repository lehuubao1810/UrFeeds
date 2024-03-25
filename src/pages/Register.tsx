import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { registerUser, loginWithGoogle, loginWithGithub } from "../redux/auth.slice";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const {status} = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ email, username, password }));
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
        <h1 className="text-2xl font-bold text-center mb-12 ">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 text-center">
          Login
        </Link>
        </div>
        
        <div className="text-center mt-4 text-sm font-bold">or login with</div>
        <div className="flex justify-center mt-4">
          <div className="p-2 rounded-md mr-2">
            <img src="./gg_icon.png" alt="google" onClick={handleGoogleLogin}
              className="cursor-pointer h-8 w-8 hover:opacity-90 hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
          <div className="p-2 rounded-md mr-2">
            <img src="./github_icon.png" alt="github" onClick={handleGithubLogin}
              className="cursor-pointer h-8 w-8 hover:opacity-90 hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
