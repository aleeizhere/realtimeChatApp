import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: (values, action) => {
        console.log(values);
      },
    });

  /*
    when you do handleChange it keeps updating the initialValues object and keeps returning it as a values object
    down in the element we keep using it in the value prop of the element
    the value of the element keeps updating to the latest value.
    the moment we press submit the onSubmit function calls and the initialValues object gets passed in it as arguments.
  */

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen testBorder bg-gradient-to-r from-stone-100 via-white to-transparent">
        <div className="flex flex-col items-start justify-between  w-1/3 h-2/3 px-4 py-3">
          <span className="font-logo font-bold text-2xl mt-4 text-green-600 opacity-70">
            WhatsChat
          </span>
          <span className="text-6xl font-extralight">Register</span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full  justify-around"
          >
            <input
              type="text"
              placeholder="Display name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="px-3 py-4 mb-2 outline-none bg-neutral-100 rounded-md focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="px-3 py-4 mb-2 outline-none bg-neutral-100 rounded-md focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
            />
            <input
              type="password"
              autoComplete="off"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="px-3 py-4 mb-2 outline-none bg-neutral-100 rounded-md focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
            />
            <input
              type="password"
              autoComplete="off"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className="px-3 py-4 mb-2 outline-none bg-neutral-100 rounded-md focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
            />
            <input type="file" id="file" className="hidden" />
            <label
              htmlFor="file"
              className="flex items-center w-max px-4 py-2 my-4 rounded-md hover:text-green-900 transition-colors ease-in-out cursor-pointer"
            >
              <AddAPhotoIcon
                className="opacity-40 mr-4"
                sx={{ fontSize: "3rem" }}
              />
              <span className="opacity-40">Add an avatar</span>
            </label>
            <button
              type="submit"
              className="bg-green-200 py-3 font-bold rounded-md text-green-900 text-2xl hover:bg-green-400 hover:text-white transition-colors ease-in-out"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
