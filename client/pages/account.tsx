import React from "react";
import firebase from "firebase/app";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";

const AccountPage = () => {
  const AuthUser = useAuthUser();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div>
        {JSON.stringify(AuthUser)}
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </div>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AccountPage);
