import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import ErrorPage from "./error-page.tsx"
import Index from "./index.tsx";

const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                { index: true,
                    element: <Index />
                },
            ]
        }
    ]);
    return <RouterProvider router={router} />
}

export default Router