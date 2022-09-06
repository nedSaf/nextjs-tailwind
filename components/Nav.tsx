import Link from "next/link";

const navLinkStyle = `cursor-pointer inline-flex items-center px-1 pt-1 text-gray-500 hover:text-indigo-400`;

const iconButtonStyle = `flex bg-white p-2 rounded-full text-gray-400 hover:text-indigo-400 border-2 border-gray-500 hover:border-indigo-400`;

import { useUser } from "@auth0/nextjs-auth0";

export default function Nav() {
  const { user, isLoading } = useUser();
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="ml-6 flex space-x-8">
              <Link href="/">
                <a className={navLinkStyle}> Home </a>
              </Link>
            </div>
          </div>

          <div className="ml-6 flex items-center justify-between space-x-2">
            <Link href="/cart">
              <button className={iconButtonStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {` ${3} Item(s)`}
              </button>
            </Link>
            {!user ? (
              <a
                href="/api/auth/login"
                className={`${iconButtonStyle} text-gray-800 border-gray-800 bg-orange-100`}
              >
                Login as provider
              </a>
            ) : (
              <>
                <img
                  className="rounded-full w-8 h-8 mx-2"
                  src={user.picture ?? ""}
                  alt=""
                />
                <span className="mx-2">{user.name}</span>
                <Link href="/manage-shops">
                  <a
                    className={`${iconButtonStyle} text-gray-800 border-gray-800 bg-orange-100`}
                  >
                    Manage Shops
                  </a>
                </Link>
                <a
                  href="/api/auth/logout"
                  className={`${iconButtonStyle} text-gray-800 border-gray-800 bg-orange-100`}
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
