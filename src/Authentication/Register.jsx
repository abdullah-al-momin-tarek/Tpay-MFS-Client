import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Pages/Providers/AuthProvider";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password.length != 5) {
      toast.error("Password must be 5 digit");
      return;
    }
    const userData = { ...data, status: "pending", balance: 0 };
    console.log(userData);
    axiosPublic.post("/register", userData).then((res) => {
      console.log("text", res.data);
      login(res.data);
      toast.error("Register Successful");
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 mx-auto mt-12">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign up</h1>
      </div>
      <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="Name"
              {...register("displayName", { required: true })}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            {errors.displayName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">
              Your Role
            </label>
            <select
              className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              name="role"
              {...register("role")}
            >
              <option value={"user"}>user</option>
              <option value={"agent"}>agent</option>
            </select>
            {errors.displayName && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="Phone" className="block mb-2 text-sm">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            {errors.phone && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            {errors.email && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Enter 5 digit pin
              </label>
            </div>
            <input
              type="password"
              name="password"
              placeholder="*****"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            {errors.password && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Sign in
            </button>
          </div>
          <p className="px-6 text-sm text-center dark:text-gray-600">
            Already have an account?
            <Link className="text-blue-800 hover:underline" to={"/login"}>
              Sign in
            </Link>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;
