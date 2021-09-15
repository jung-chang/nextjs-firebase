import React from "react";
import firebase from "firebase/app";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import Head from "next/head";
import { getArtists } from "utils/server";

const AccountPage = ({ artists }: { artists: any[] }) => {
  const AuthUser = useAuthUser();

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div>
        {JSON.stringify(AuthUser)}
        {JSON.stringify(artists)}
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </div>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const idToken = await AuthUser.getIdToken();
  const artists = await getArtists(idToken);
  return {
    props: { artists },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(AccountPage);
