import { createBrowserRouter } from 'react-router-dom'

import App from "./App";
import Home from './Home/Home'
import Property from "./Property/property";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            { path: "", element: <Home /> },
            { path: "property", element: <Property /> },
        ],
    },
]);

export default router;