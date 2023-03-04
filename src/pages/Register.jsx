import React, { useEffect, useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useFormik } from "formik";
import { RegistrationSchema } from "../validations/RegistrationSchema";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  displayImage: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [showErrors, setshowErrors] = useState({
    name: "translate-x-full1",
    email: "translate-x-full1",
    password: "translate-x-full1",
    confirmPassword: "translate-x-full1",
  });

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
    validationSchema: RegistrationSchema,
    //perform every function on this onSubmit function adding into the database, creating profile image link
    onSubmit: async (values, action) => {
      // console.log(values);
      try {
        const registerResponse = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const date = new Date().getTime();
        // setting the image in the storage
        const storageRef = ref(storage, `${values.email + date}`);
        // generate the download URL from the image and set it in the firestore database
        await uploadBytesResumable(storageRef, values.displayImage).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(registerResponse.user, {
                displayName: values.name,
                photoURL: downloadURL,
              });

              await setDoc(
                doc(db, "users", registerResponse.user.uid, {
                  uid: registerResponse.user.uid,
                  name: values.name,
                  email: values.email,
                  photoURL: downloadURL,
                })
              );
              await setDoc(doc(db, "userChats", registerResponse.user.uid), {});
            } catch (e) {
              console.log(e);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
      action.resetForm();
    },
  });

  const handleErrors = () => {
    // console.log("Handle Errors Called");
    let errorObj = showErrors;
    for (let prop in errorObj) {
      if (errors[prop]) {
        errorObj = { ...errorObj, [prop]: "translate-x-1/2" };
        setshowErrors(errorObj);
      }
    }
    setTimeout(() => {
      setshowErrors({
        name: "translate-x-full1",
        email: "translate-x-full1",
        password: "translate-x-full1",
        confirmPassword: "translate-x-full1",
      });
    }, 3000);
  };
  // console.log("Errors ", errors);
  const passwordField = useRef(null);
  const cpasswordField = useRef(null);
  /*
    when you do handleChange it keeps updating the initialValues object and keeps returning it as a values object
    down in the element we keep using it in the value prop of the element
    the value of the element keeps updating to the latest value.
    the moment we press submit the onSubmit function calls and the initialValues object gets passed in it as arguments.
  */

  return (
    <React.Fragment>
      <div className="flex items-center justify-center w-screen h-screen testBorder bg-gradient-to-tl from-zinc-200 via-white to-transparent">
        <div className="flex flex-col items-start justify-between  w-1/3 h-3/4 px-4 py-3">
          <span className="font-logo font-bold text-2xl mt-4 text-green-600 opacity-70">
            WhatsChat
          </span>
          <span className="text-6xl font-extralight">Register</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              handleErrors();
            }}
            className="flex flex-col w-full justify-around relative"
          >
            <div className="relative mb-2 overflow-hidden rounded-md">
              <div
                className={`absolute flex items-center p-3 w-full rounded-l-full bg-red-400 text-white trans h-full ${showErrors.name} transition-transform ease-in duration-150`}
              >
                {errors.name}
              </div>
              <input
                autoComplete="off"
                type="text"
                placeholder="Display name"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full px-3 py-4 outline-none bg-neutral-100  transition-all ease-in-out"
              />
            </div>

            <div className="relative mb-2 overflow-hidden rounded-md">
              <div
                className={`absolute flex items-center p-3 w-full rounded-l-full bg-red-400 text-white trans h-full ${showErrors.email} transition-transform ease-in duration-150`}
              >
                {errors.email}
              </div>
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
              <div
                className={`absolute flex items-center p-3 w-full rounded-l-full bg-red-400 text-white trans h-full ${showErrors.password} transition-transform ease-in duration-150`}
              >
                {errors.password}
              </div>
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

            <div className="relative mb-2 overflow-hidden rounded-md">
              <div
                className={`absolute flex items-center p-3 w-full rounded-l-full bg-red-400 text-white trans h-full ${showErrors.confirmPassword} transition-transform ease-in duration-150`}
              >
                {errors.confirmPassword}
              </div>
              <input
                type="password"
                ref={cpasswordField}
                autoComplete="off"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-4 outline-none bg-neutral-100  focus:outline-1 focus:outline-green-300 transition-all ease-in-out"
              />
              <span
                className="absolute right-0 translate-y-1/2 mr-2 opacity-30 cursor-pointer hover:opacity-100"
                onClick={() => {
                  cpasswordField.current.attributes.type.nodeValue ===
                  "password"
                    ? (cpasswordField.current.attributes.type.nodeValue =
                        "text")
                    : (cpasswordField.current.attributes.type.nodeValue =
                        "password");
                }}
              >
                <VisibilityOutlinedIcon />
              </span>
            </div>
            <input
              type="file"
              id="file"
              className="hidden"
              name="displayImage"
              value={values.displayImage}
              onChange={handleChange}
            />
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
              disabled={isSubmitting}
              type="submit"
              className="bg-green-200 py-3 font-bold rounded-md text-green-900 text-2xl hover:bg-green-400 hover:text-white disabled:bg-green-100 hover:disabled:bg-green-100 disabled:hover:text-green-900 transition-colors ease-in-out"
            >
              Sign up
            </button>
            <div className="text-base font-semibold text-gray-400 mt-8">
              Already have an account?{" "}
              <Link to="/" className="text-green-800">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
