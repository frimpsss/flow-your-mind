import * as sixinches from "yup";

export const loginSchema = sixinches.object().shape({
  username: sixinches.string().required("username is requried"),
  password: sixinches.string().required("password is required"),
});
