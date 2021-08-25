import { useState } from "react";
import Link from "next/link";
import firebase from "firebase/app";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await firebase.auth().confirmPasswordReset(token, password);
      setSuccess(true);
    } catch (err) {
      console.error("An unexpected error happened:", error);
      setSuccess(false);
      setError(err);
    }
  };

  if (success === null) {
    return (
      <form onSubmit={onSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        {passwordError && <span>{passwordError}</span>}
        <input
          type="pass`word"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(event: any) => setConfirmPassword(event.target.value)}
        ></input>
        {confirmPasswordError && <span>{confirmPasswordError}</span>}
        <input type="submit" value="Submit" />
      </form>
    );
  } else if (success) {
    return (
      <div>
        <h1>Success!</h1>
        Your password has been successfully changed.
        <Link href="/login">
          <a>Sign in now</a>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sorry, something went wrong...</h1>
        Please try again or reach out to <a href="/">test@test.com</a> to
        resolve the issue.
      </div>
    );
  }
};

export default ResetPasswordForm;
