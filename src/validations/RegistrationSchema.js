import * as Yup from "yup";

export const RegistrationSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please Enter the name"),
  email: Yup.string()
    .email("Enter a valid Email Address")
    .required("Please enter the valid email address"),
  password: Yup.string().min(6).required("Password not entered"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords did not match"),
});
