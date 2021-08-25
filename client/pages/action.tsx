const FirebaseActionPage = () => {
  return null;
};

export const getServerSideProps = async ({ query }) => {
  const { mode, oobCode } = query;

  if (mode === "verifyEmail") {
    return {
      redirect: {
        permanent: false,
        destination: `/verify-email?token=${oobCode}`,
      },
      props: {},
    };
  } else if (mode === "resetPassword") {
    return {
      redirect: {
        permanent: false,
        destination: `/reset-password?token=${oobCode}`,
      },
      props: {},
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/404",
    },
    props: {},
  };
};

export default FirebaseActionPage;
