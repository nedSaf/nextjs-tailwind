import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import ProductList from "../components/ProductList";

const GET_PRODUCTS = gql`
  query {
    getAllProducts {
      data {
        _id
        name
        description
        price
        image
        shop {
          _id
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  return loading ? (
    <div className={styles.container}>
      <p className="text-xl text-teal-800 mt-12 text-center">Loading...</p>
    </div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Products</title>
        <meta name="description" content="Nice Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductList products={data?.getAllProducts.data} />

      <Footer />
    </div>
  );
};

export default Home;
