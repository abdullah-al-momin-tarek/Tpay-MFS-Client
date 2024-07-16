import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SendMoney = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const sendData = { ...data, id: user._id };
    console.log(sendData);
    axiosPublic
      .post("/send", sendData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto mt-12">
      <h1 className="text-2xl font-bold text-center mb-6">Send Money</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Enter Receiver Number
          </label>
          <input
            type="text"
            name="number"
            placeholder="Receiver Number"
            {...register("number", { required: true })}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border"
          />
          {errors.number && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Enter Sending amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Send Amount"
            {...register("amount", { required: true })}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border"
          />
          {errors.amount && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Enter Your Pin
          </label>
          <input
            type="password"
            name="password"
            {...register("password", { required: true })}
            placeholder="Your Pin"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 border"
          />
          {errors.password && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
        >
          Send Money
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
