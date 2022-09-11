import Head from "next/head";
import Footer from "../components/Footer";
import { useContext } from "react";
import { Context } from "../context";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Cart() {
  // @ts-ignore.
  const { state, dispatch } = useContext(Context as any);
  const { cart } = state;

  let totalAmount = 0;

  for (const [key, value] of Object.entries(cart)) {
    totalAmount = totalAmount + cart[key].price * cart[key].qty;
  }

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <ul role="list" className="my-6 divide-y divide-gray-200">
          {Object.entries(cart).map(([key, value]) => {
            return (
              <li key={key} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200">
                  <img
                    src={cart[key].image}
                    className="h-full w-full object-cover object-center"
                    alt={cart[key].name}
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{cart[key].name}</h3>
                      <p className="ml-4">$ {cart[key].price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {cart[key].description}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {cart[key].qty}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => {
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: cart[key],
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-6">
          <div>Total $ {totalAmount}</div>
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white"
          >
            Checkout
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
