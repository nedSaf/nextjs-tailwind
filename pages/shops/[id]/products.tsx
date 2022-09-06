import { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import NewProduct from "../../../components/NewProduct";
import { getAccessToken } from "@auth0/nextjs-auth0";

const ProductsPage: NextPage = (props: any) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <Head>
        <title>Products page</title>
        <meta name="description" content="Manage Shops" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewProduct shopId={id} accessToken={props.accessToken} />
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const { accessToken } = await getAccessToken(ctx.req, ctx.res);

  return {
    props: {
      accessToken,
    },
  };
}

export default ProductsPage;
