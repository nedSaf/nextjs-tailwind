import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";

const GET_SHOP_BY_ID = gql`
  query GetShop($shopId: ID!) {
    findShopByID(id: $shopId) {
      _id
      name
      description
      products {
        data {
          _id
          name
        }
      }
    }
  }
`;

const ShopDetailsPage: NextPage = (props: any) => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useQuery(GET_SHOP_BY_ID, {
    variables: { shopId: id },
  });

  return loading ? (
    <div className={styles.container}>
      <Head>
        <title>Shop page</title>
        <meta name="description" content="Shop page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Loading...</p>
    </div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Shop page</title>
        <meta name="description" content="Shop page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-16">
        <h1 className={styles.title}>{data.findShopByID.name}</h1>
        <p className={styles.description}>{data.findShopByID.description}</p>
        {data.findShopByID.products.data.map((product: any) => (
          <div key={product._id} className="rounded-lg bg-white shadow mb-1">
            <ul className="divide-y divide-gray-100">
              <li className="flex justify-between p-3">
                <div>
                  <p>{product.name}</p>
                </div>
                <div>
                  <button className="mr-2 underline pointer text-blue-600">
                    Edit
                  </button>
                  <button className="ml-1 underline pointer text-red-600">
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopDetailsPage;
