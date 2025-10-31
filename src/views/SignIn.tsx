import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import "../Styles/signIn.css";

interface Inputs {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>

      <label htmlFor="email">Enter email address</label>
      <input
        type="email"
        id="email"
        placeholder="you@example.com"
        {...register("email", { required: true })}
      />
      {errors.email && <span className="error-message">Email is required</span>}

      <label htmlFor="password">Enter password</label>
      <div className="password-area">
        <input
          type={passwordVisible ? "text" : "password"}
          id="password"
          {...register("password", {
            required: true,
          })}
        />
        <span
          id="eye-icon"
          className="eye-icon"
          onClick={() => setPasswordVisible((recent) => !recent)}
        >
          👁
        </span>
      </div>
      {errors.password && (
        <span className="error-message">Email is required</span>
      )}

      <button type="submit">Submit</button>

      <p className="small-text">
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  );
};
