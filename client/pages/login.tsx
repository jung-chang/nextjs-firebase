import { useState } from "react";
import Head from "next/head";
import firebase from "firebase/app";
import { isEmailValid, isPasswordValid } from "utils/validation";

const LogInForm = () => {
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

  const onSubmit = async (event: any) => {
    // firebase.auth().onIdTokenChanged(async (firebaseUser) => {
    //   console.log(firebaseUser);
    // });
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log({ user });
    } catch (error: any) {
      setError(error.message);
    }
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
      <input type="submit" value="Log in" />
      <span>{error}</span>
    </form>
  );
};

const LogInPage = () => {
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <main>
        <LogInForm />
      </main>
    </>
  );
};

export default LogInPage;
