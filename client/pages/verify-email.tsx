import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { useEffect, useState } from "react";
import firebase from "firebase/app";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(["effect", token]);
    if (!!token && token.length && !success) {
      console.log(token);
      firebase
        .auth()
        .applyActionCode(token as string)
        .then(() => setSuccess(true))
        .catch((error: any) => console.error({ error }));
    }
  }, [token]);

  return (
    <Layout>
      <Head>
        <title>Verify Email</title>
      </Head>
      <main>
        <div>
          <h1>Verify Email</h1>
          {success && (
            <div>
              <h1>Success!</h1>
              Click here to log in.
            </div>
          )}
          {!success && (
            <div>
              <h1>Sorry, something went wrong...</h1>
              Please try again or reach out to <a href="/">test@test.com</a> to
              resolve the issue.
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default VerifyEmailPage;
