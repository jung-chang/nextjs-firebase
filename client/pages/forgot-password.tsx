import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "components/Layout";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { email } = router.query;

  const [botField, setBotField] = useState("");
  const [accountEmail, setAccountEmail] = useState((email ?? "") as string);
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Reset Password</title>
      </Head>
      <main>
        <h1>Forgot Password</h1>
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
            value={accountEmail}
            type="email"
            onChange={(event) => setAccountEmail(event.target.value)}
          />
          {emailError && <span>{emailError}</span>}
          <input type="submit" value="Log in" />
          <span>{error}</span>
        </form>
      </main>
    </Layout>
  );
};

export default ForgotPasswordPage;
