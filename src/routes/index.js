import { createBrowserRouter } from "react-router-dom";
import React from "react";


// load component theo tung page rieng biet
const Layout = React.lazy(() => import("../layout/container/Layout"));
const Home = React.lazy(() => import("../pages/home/Home"));
const ListAccount = React.lazy(() => import("../pages/accounts/ListAccount"));
const Products = React.lazy(() => import("../pages/products/Products"));
const News = React.lazy(() => import("../pages/products/Catagory/News"));
const Vaccine = React.lazy(() => import("../pages/products/Catagory/Vaccine"));
const Doctors = React.lazy(() => import("../pages/products/Catagory/Doctors"));
const Health = React.lazy(() => import("../pages/products/Health"));
const Case = React.lazy(() => import("../pages/products/Catagory/Case"));
const About = React.lazy(() => import("../pages/products/Catagory/About"));


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <React.Suspense>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "home",
        element: (
          <React.Suspense>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "listAccount",
        element: (
          <React.Suspense>
            <ListAccount />
          </React.Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <React.Suspense>
            <Products />
          </React.Suspense>
        ),
      },
      {
        path: "news",
        element: (
          <React.Suspense>
            <News />
          </React.Suspense>
        ),
      },
      {
        path: "health",
        element: (
          <React.Suspense>
            <Health />
          </React.Suspense>
        ),
      },
      {
        path: "vaccine",
        element: (
          <React.Suspense>
            <Vaccine />
          </React.Suspense>
        ),
      },
      {
        path: "doctors",
        element: (
          <React.Suspense>
            <Doctors />
          </React.Suspense>
        ),
      },
      {
        path: "case",
        element: (
          <React.Suspense>
            <Case />
          </React.Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <React.Suspense>
            <About />
          </React.Suspense>
        ),
      }
    ],
  },
]);
export default router;
