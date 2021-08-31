import { useState } from "react";
import Head from "next/head";
import firebase from "firebase/app";
import { isEmailValid, isPasswordValid } from "utils/validation";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { signUp } from "utils/server";

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
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
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

const GoogleAuthProvider = () => {
  const googleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      if (result.additionalUserInfo.isNewUser) {
        signUp(result.user.email, result.user.uid).catch(() =>
          console.error("Failed to sign up in server.")
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={googleSignIn}>Google</button>;
};

const EmailAuthProvider = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (!isEmailValid(email)) {
      setEmailError("Please input a valid email address");
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      // await firebase.auth().sendSignInLinkToEmail(email, {
      //   url: "http:localhost:3000/email-login",
      //   handleCodeInApp: true,
      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <input
        placeholder="Email"
        value={email}
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      {emailError && <span>{emailError}</span>}
      <input type="submit" value="Log in with Email" />
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
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        <GoogleAuthProvider />
        <EmailAuthProvider />
      </main>
    </>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: "/account",
})(LogInPage);
