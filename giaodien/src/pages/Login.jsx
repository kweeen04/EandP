import { useState, useContext } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext.jsx";
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token, user } = response.data;
      login(token);
      if (user.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <LogIn className="h-7 w-7 text-white" />
          </motion.div>
          <h2 className="mt-6 text-4xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 tracking-wide">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5 transition-all duration-300 group-focus-within:text-indigo-600"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:border-indigo-300 text-gray-900 placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5 transition-all duration-300 group-focus-within:text-indigo-600"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 hover:border-indigo-300 text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 focus:outline-none transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
              />
              <span className="ml-2 text-gray-600 hover:text-gray-900">
                Remember me
              </span>
            </label>
            <Link
              to="/reset-password-request"
              className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </motion.button>

            <motion.a
              href="http://localhost:5000/api/users/auth/google"
              className="w-full flex justify-center items-center py-3 px-4 bg-white text-gray-700 rounded-xl font-medium shadow-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </motion.a>

            <p className="text-center text-sm text-gray-600">
              New here?{" "}
              <NavLink
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                Create an account
              </NavLink>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;