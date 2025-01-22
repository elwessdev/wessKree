import { createBrowserRouter } from 'react-router-dom'

import App from "./App";
import Home from './Home/Home'
import Property from "./Property/property";
import Signup from './Auth/Signup/signup';
import Profile from './Profile/profile';
import PostPerperty from './Post-Property/post-property';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            { path: "", element: <Home /> },
            { path: "property", element: <Property /> },
            { path: "signup", element: <Signup /> },
            { path: "profile", element: <Profile /> },
            { path: "post-property", element: <PostPerperty /> },
        ],
    },
]);

export default router;