import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterModal(props) {
  function handleClick(event) {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      props.childSetModal("none");
    }
  }

  function exit() {
    props.childSetModal("none");
  }

  function login() {
    props.childSetModal("login");
  }

  const dropdown = useRef(null);
  const theme = props.theme;

  return (
    <div onClick={handleClick} className="absolute top-0 z-50 h-full w-full">
      <div
        className={`flex w-full h-full ${
          theme == "dark" ? "bg-gray-900/80" : "bg-gray-900/60"
        }`}>
        <div
          ref={dropdown}
          className={`flex mx-auto my-auto w-96 rounded-lg shadow ${
            theme == "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}>
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={exit}>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8 w-full">
            <h3
              className={`flex justify-center mb-4 text-xl font-medium ${
                theme == "dark" ? "text-white" : "text-neutral-900"
              }`}>
              Sign up to GameHub
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={30}
                height={25}
                className="mx-1"></Image>
            </h3>
            <form className="space-y-5" action="#">
              <div>
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-medium ${
                    theme == "dark" ? "text-white" : "text-neutral-900"
                  }`}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 
                  ${
                    theme == "dark"
                      ? "text-white bg-gray-600 border-gray-500"
                      : "text-neutral-900 bg-gray-100 border-neutral-900"
                  }`}
                  placeholder="johndoe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${
                    theme == "dark" ? "text-white" : "text-neutral-900"
                  }`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 
                  ${
                    theme == "dark"
                      ? "text-white bg-gray-600 border-gray-500"
                      : "text-neutral-900 bg-gray-100 border-neutral-900"
                  }`}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${
                    theme == "dark" ? "text-white" : "text-neutral-900"
                  }`}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 
                  ${
                    theme == "dark"
                      ? "text-white bg-gray-600 border-gray-500"
                      : "text-neutral-900 bg-gray-100 border-neutral-900"
                  }`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className={`block mb-2 text-sm font-medium ${
                    theme == "dark" ? "text-white" : "text-neutral-900"
                  }`}>
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={`border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 
                  ${
                    theme == "dark"
                      ? "text-white bg-gray-600 border-gray-500"
                      : "text-neutral-900 bg-gray-100 border-neutral-900"
                  }`}
                  required
                />
              </div>
              <button
                type="submit"
                className="transition-all duration-500 ease-in-out w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Create an account
              </button>
              <div
                className={`flex justify-center text-sm font-medium ${
                  theme == "dark" ? "text-gray-300" : "text-neutral-600"
                }`}>
                Already have an account?
                <Link
                  onClick={login}
                  href="/"
                  className=" px-1 hover:underline text-blue-500">
                  Sign in.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
