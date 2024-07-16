import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Pages/Providers/AuthProvider";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);

    axiosPublic
      .post("/login", data)
      .then((response) => {
        console.log(response.data);
        const { token } = response.data;
        login(token);
        toast.error("Register Successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
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
            <label htmlFor="email" className="block mb-2 text-sm">
              Email or Phone number
            </label>
            <input
              type="text"
              name="username"
              placeholder="Email or Phone number"
              {...register("username", { required: true })}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
            {errors.username && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
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
            Don&#39;t have an account yet?
            <Link className="text-blue-800 hover:underline" to={"/register"}>
              Sign up
            </Link>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
