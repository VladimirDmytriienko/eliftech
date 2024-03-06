import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Header from './components/header/Header'
import Main from './components/main/Main'
import Cart from './components/cart/Cart';


const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "cart",
        element: <Cart></Cart>
      },
    ]
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
