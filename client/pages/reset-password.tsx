import Head from "next/head";
import { useRouter } from "next/router";

import { withAuthUserTokenSSR } from "next-firebase-auth";
import Layout from "components/Layout";
import SendResetPasswordForm from "components/SendResetPasswordForm";
import ResetPasswordForm from "components/ResetPasswordForm";

const ResetPasswordPage = ({ userEmail }: { userEmail: string }) => {
  const router = useRouter();
  const { oobCode } = router.query;

  return (
    <Layout>
      <Head>
        <title>Reset Password</title>
      </Head>
      <main>
        <div>
          <h1>Reset Password</h1>
          {!oobCode && <SendResetPasswordForm defaultEmail={userEmail} />}
          {oobCode && <ResetPasswordForm token={oobCode as string} />}
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    return {
      props: { userEmail: AuthUser.email },
    };
  }
);

export default ResetPasswordPage;
