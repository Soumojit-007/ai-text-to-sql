import { useState } from "react";
import { login , signup } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/common/Toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let res;
      if (isLogin) {
        res = await login(email, password);
        setToken(res.access_token);
        toastSuccess("Login successful");
        navigate("/dashboard");
      } else {
        await signup(email, password);
        toastSuccess("Signup successful");
        setIsLogin(true);
      }
    } catch {
      toastError("Authentication failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="glass p-8 w-[350px] space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-transparent border border-white/10 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-transparent border border-white/10 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-white/10 hover:bg-white/20 rounded transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="text-xs text-center text-gray-400 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
}
