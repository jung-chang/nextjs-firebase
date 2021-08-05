import { useState } from "react";
import firebase from "firebase/app";
import { isEmailValid } from "utils/validation";

const SendResetPasswordForm = () => {
  const [botField, setBotField] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setEmailError("Please input a valid email address.");
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      setError(err);
    }
  };

  if (success === null) {
    return (
      <form onSubmit={onSubmit}>
        <input
          name="name"
          aria-label="Humans need not fill out"
          type="text"
          tabIndex={-1}
          value={botField}
          onChange={(event) => setBotField(event.target.value)}
          style={{ display: "none" }}
        />
        <input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        {emailError && <span>{emailError}</span>}
        <input type="submit" value="Log in" />
        <span>{error}</span>
      </form>
    );
  } else if (success) {
    return (
      <div>
        <h1>Success!</h1>
        Check your inbox -- We have sent you a password reset link.
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

export default SendResetPasswordForm;
