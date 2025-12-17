import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineEmail, MdOutlineLock, MdPersonOutline } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

const RegistrationPage = () => {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (event) => {
    // event.target.name is the 'name' attribute of the input (e.g., "email")
    // event.target.value is what you just typed (e.g., "a")

    setFormData((prevState) => ({
      // 1. The Spread Operator (...prevState):
      // This copies ALL existing fields from the previous state into this new object.
      // If prevState was { name: "John", email: "" }, this line puts "John" and "" here.
      ...prevState,

      // 2. Computed Property Name ([event.target.name]):
      // This effectively says: "Update ONLY the key that matches the input name."
      // If you typed in the email box, this becomes "email": "a".
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);

      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <title>Register User</title>
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-block p-4 bg-fuchsia-100 text-fuchsia-600 rounded-full">
              <HiOutlineUserAdd className="w-10 h-10" />
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to start shopping for premium items
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPersonOutline className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={onChange}
                  className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading
                  ? "bg-fuchsia-300"
                  : "bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
              } transition-colors`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-fuchsia-600 hover:text-fuchsia-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
