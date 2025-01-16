import * as yup from "yup";

export const LOGIN_SCHEMA = yup.object({
  username: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
