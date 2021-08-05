import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import SendResetPasswordForm from "components/SendResetPasswordForm";
import ResetPasswordForm from "components/ResetPasswordForm";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <Layout>
      <Head>
        <title>Reset Password</title>
      </Head>
      <main>
        <div>
          <h1>Reset Password</h1>
          {!token && <SendResetPasswordForm />}
          {token && <ResetPasswordForm />}
        </div>
      </main>
    </Layout>
  );
};

export default ResetPasswordPage;
