import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function HeaderComponent() {
  const userLogin = useSelector(
    (state) => state.UserLoginJiraReducer.userLogin
  );
  return (
    // <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-800">
    //   <div className="container flex flex-wrap justify-between items-center mx-auto">
    //     <NavLink to="/" className="flex items-center">
    //       <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
    //         JIRA PROJECT
    //       </span>
    //     </NavLink>
    //     <div className="flex items-center md:order-2">
    //       <button
    //         type="button"
    //         className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    //         id="user-menu-button"
    //         aria-expanded="false"
    //         data-dropdown-toggle="dropdown"
    //       >
    //         <span className="sr-only">Open user menu</span>
    //         <img
    //           className="w-8 h-8 rounded-full"
    //           src={userLogin.avatar}
    //           alt="user photo"
    //         />
    //       </button>
    //       {/* Dropdown menu */}
    //       <div
    //         className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
    //         id="dropdown"
    //       >
    //         <div className="py-3 px-4">
    //           <span className="block text-sm text-gray-900 dark:text-white">
    //             {userLogin.name}
    //           </span>
    //           <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
    //             {userLogin.email}
    //           </span>
    //         </div>
    //         <ul className="py-1" aria-labelledby="dropdown">
    //           <li>
    //             <NavLink
    //               to="#"
    //               className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Dashboard
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to="#"
    //               className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Settings
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to="#"
    //               className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Earnings
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to="#"
    //               className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //             >
    //               Sign out
    //             </NavLink>
    //           </li>
    //         </ul>
    //       </div>
    //       <button
    //         data-collapse-toggle="mobile-menu-2"
    //         type="button"
    //         className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //         aria-controls="mobile-menu-2"
    //         aria-expanded="false"
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <svg
    //           className="w-6 h-6"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //         <svg
    //           className="hidden w-6 h-6"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //     <div
    //       className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
    //       id="mobile-menu-2"
    //     >
    //       <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
    //         <li>
    //           <NavLink
    //             to="/home"
    //             className="block text-base py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
    //             aria-current="page"
    //           >
    //             Home
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/about"
    //             className="block text-base py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             About
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/service"
    //             className="block text-base py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Services
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/price"
    //             className="block text-base   py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Pricing
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/contact"
    //             className="block text-base py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Contact
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to="/login"
    //             className="block text-base py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    //           >
    //             Login
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <svg
              className="bi me-2"
              width={40}
              height={32}
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Inventory
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Products
              </a>
            </li>
          </ul>
          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <div className="dropdown text-end">
            <a
              href="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={userLogin.avatar}
                alt="mdo"
                className="rounded-circle"
                width={32}
                height={32}
              />
            </a>
            <ul
              className="dropdown-menu text-small"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div />
    </header>
  );
}
