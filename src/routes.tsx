import { createBrowserRouter } from 'react-router-dom'

import App from "./App";
import Home from './Home/Home'
import Property from "./Property/property";
import Signup from './Auth/Signup/signup';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            { path: "", element: <Home /> },
            { path: "property", element: <Property /> },
            { path: "signup", element: <Signup /> },
        ],
    },
]);

export default router;