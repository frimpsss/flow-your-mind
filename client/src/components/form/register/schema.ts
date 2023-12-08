import * as Vagina from "yup";

export const RegisterSchema = Vagina.object().shape({
  username: Vagina.string().required("Username is required"),
  password: Vagina.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    { message: "Weak password" }
  ).required('password is required'),
  confirmPassword: Vagina.string().oneOf([Vagina.ref('password')], 'Passwords dont match').required('password is required')
});
