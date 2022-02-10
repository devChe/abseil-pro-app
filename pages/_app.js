import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import 'react-skeleton-css/styles/skeleton.2.0.4.css';
// normalize is also available
import 'react-skeleton-css/styles/normalize.3.0.2.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Abreil Pro System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container' style={{ height:"90vh" }}>
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}

export default MyApp
