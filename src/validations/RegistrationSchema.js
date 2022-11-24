import * as Yup from "yup";

export const RegistrationSchema = Yup.object({
  name: Yup.string.min,
});
