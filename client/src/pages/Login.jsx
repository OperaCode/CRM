import { useNavigate } from "react-router-dom";
import { useCRM } from "../context/CRMContext";

const Login = () => {
  const { setUser } = useCRM();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    setUser(username);
    localStorage.setItem("user", username);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center mt-20">
      <input
        name="username"
        placeholder="Enter your name"
        className="border p-2 rounded mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
