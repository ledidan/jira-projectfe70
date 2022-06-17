import React from "react";
import { NavLink } from "react-router-dom";

export default function FooterComponent() {
  return (
    <footer className="p-4 mt-5 bg-white shadow md:px-6 md:py-8 dark:bg-gray-800">
      <div className="sm:flex sm:items-center sm:justify-between">
        <NavLink to="/" className="flex items-center mb-4 sm:mb-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Jira Software
          </span>
        </NavLink>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <NavLink to="/about" className="mr-4 hover:underline md:mr-6 ">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/policy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/licence" className="mr-4 hover:underline md:mr-6 ">
              Licensing
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="hover:underline">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <NavLink to="/" className="hover:underline">
          Jira Software
        </NavLink>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
