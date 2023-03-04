import React, { useRef } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useFormik } from "formik";
import { LoginSchema } from "../validations/LoginSchema";
import { Link } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const passwordField = useRef(null);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      // console.log(values);
      setTimeout(() => {
        console.log("did nothing");
      }, 4000);
      action.resetForm();
    },
  });
  return (
    <React.Fragment>
      <div className="flex items-center justify-center w-screen h-screen testBorder bg-gradient-to-tl from-zinc-200 via-white to-transparent">
        <div className="flex flex-col items-start  w-1/3 px-4 py-3">
          <span className="font-logo font-bold text-2xl mt-4 text-green-600 opacity-70">
            WhatsChat
          </span>
          <span className="text-6xl mb-20 font-extralight">Log In</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col w-full justify-around relative"
          >
            <div className="relative mb-2 overflow-hidden rounded-md">
              <input
                autoComplete="off"
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full px-3 py-4 outline-none bg-neutral-100  focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
              />
            </div>

            <div className="relative mb-2 overflow-hidden rounded-md">
              <input
                type="password"
                ref={passwordField}
                autoComplete="off"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full px-3 py-4 outline-none bg-neutral-100  focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
              />

              <span
                className="absolute right-0 translate-y-1/2 mr-2 opacity-30 cursor-pointer hover:opacity-100"
                onClick={() => {
                  passwordField.current.attributes.type.nodeValue === "password"
                    ? (passwordField.current.attributes.type.nodeValue = "text")
                    : (passwordField.current.attributes.type.nodeValue =
                        "password");
                }}
              >
                <VisibilityOutlinedIcon />
              </span>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-green-200 py-3 font-bold rounded-md text-green-900 text-2xl hover:bg-green-400 hover:text-white disabled:bg-green-100 hover:disabled:bg-green-100 disabled:hover:text-green-900 transition-colors ease-in-out"
            >
              Sign up
            </button>
            <div className="text-base font-semibold text-gray-400 mt-5">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-800">
                Create One!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
