import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email("not Valid").required("no email"),
  password: Yup.string().required("password not entered"),
});
