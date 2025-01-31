import { createBrowserRouter } from 'react-router-dom'
import { UserProvider } from '../context/userContext.tsx';

import App from "../App";
import Home from '../Home/Home'
import Property from "../Property/property";
import Signup from '../Auth/Signup/signup';
import Profile from '../Profile/profile';
import PostPerperty from '../Post-Property/post-property';
import SetupProfile from '../Auth/Setup-profile/setup';


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserProvider><App /></UserProvider>,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            { path: "", element: <Home /> },
            { path: "property", element: <Property /> },
            { path: "signup", element: <Signup /> },
            { path: "profile", element: <Profile /> },
            { path: "post-property", element: <PostPerperty /> },
            { path: "setup-profile", element: <SetupProfile /> },
        ],
    },
]);

export default router;