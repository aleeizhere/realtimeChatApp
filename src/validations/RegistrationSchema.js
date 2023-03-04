import * as Yup from "yup";

export const RegistrationSchema = Yup.object({
  name: Yup.string().min(2, "atleast 2 characters").max(25).required("no name"),
  email: Yup.string().email("not Valid").required("no email"),
  password: Yup.string()
    .min(6, "atleast 6 characters")
    .required("password not entered"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "no match"),
});
