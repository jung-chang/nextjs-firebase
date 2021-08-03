import Layout from "components/Layout";
import initAuth from "utils/firebase";

initAuth();

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App;