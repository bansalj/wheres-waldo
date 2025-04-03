import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Root, { Timer } from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx";
import Index from "./routes/index.tsx";
import Waldo from "./routes/waldo.tsx";
import './index.css';

const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                { 
                    index: true,
                    element: <Index />
                },
                { 
                    path: "/waldo",
                    element: <Waldo />,        
                },
            ]
        }
    ]);
    return <RouterProvider router={router} />
}

export default Router