import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import firebase from "firebase/app";
import { isEmailValid, isPasswordValid } from "utils/validation";
import { signUp } from "utils/server";

const SignUpForm = () => {
  const [botField, setBotField] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const isFormValid = () => {
    if (botField.length != 0) {
      return;
    }
    const emailValid = isEmailValid(email);
    const passwordValid = isPasswordValid(password);
    if (!emailValid) {
      setEmailError("Please input a valid email address");
    }
    if (!passwordValid) {
      setPasswordError("Please input a valid password");
    }
    return emailValid && passwordValid;
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredentials: firebase.auth.UserCredential) => {
        userCredentials.user
          .sendEmailVerification()
          .catch(() => console.error("Failed to send email verification."));
        signUp(email, userCredentials.user.uid).catch(() =>
          console.error("Failed to sign up in server.")
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="name"
        aria-label="Humans need not fill out"
        type="text"
        tabIndex={-1}
        value={botField}
        onChange={(event: any) => setBotField(event.target.value)}
        style={{ display: "none" }}
      />
      <input
        placeholder="Email"
        value={email}
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      {emailError && <span>{emailError}</span>}
      <input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      {passwordError && <span>{passwordError}</span>}
      <span>
        By signing up, you agree to the{" "}
        <Link href="/terms">
          <a>terms of service</a>
        </Link>{" "}
        and{" "}
        <Link href="/privacy">
          <a>privacy policy</a>
        </Link>
      </span>
      <input type="submit" value="Sign up" />
      <span>{error}</span>
    </form>
  );
};

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <main>
        <SignUpForm />
      </main>
    </>
  );
};

export default SignUpPage;
