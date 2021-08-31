export const isProduction = () => {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENV === "production"
  );
};

export const CLIENT = isProduction()
  ? "https://test.com"
  : "http://localhost:3000";

export const SERVER = isProduction()
  ? "https://test.com/api"
  : "http://localhost:8000/api";

export const API = {
  // Auth
  SIGNUP: () => `${SERVER}/auth/signup`,
};

export const signUp = async (email: string, firebaseId: string) => {
  return await fetch(API.SIGNUP(), {
    method: "POST",
    mode: "cors",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email, firebase_id: firebaseId }),
  });
};
