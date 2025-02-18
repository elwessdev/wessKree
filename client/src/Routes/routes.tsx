import { createBrowserRouter } from 'react-router-dom'
import { UserProvider } from '../hooks/userContext.tsx';

import App from "../App";
import Home from '../Home/Home'
import Property from "../Property/property";
import Signup from '../Auth/Signup/signup';
import PostPerperty from '../Post-Property/post-property';
import SetupProfile from '../Auth/Setup-profile/setup';
import Settings from '../Settings/settings.tsx';
import MyProfile from '../Profile/MyProfile.tsx';
import UserProfile from '../Profile/UserProfile.tsx';
import Requests from '../Requests/requests.tsx';
import { SearchProvider } from '../hooks/searchContext.tsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserProvider><SearchProvider><App /></SearchProvider></UserProvider>,
        errorElement: <h1>404 Not Found</h1>,
        children: [
            { path: "", element: <Home /> },
            { path: "search", element: <Home /> },
            { path: "property/:id", element: <Property /> },
            { path: "signup", element: <Signup /> },
            { path: "profile/:userNameUrl", element: <UserProfile /> },
            { path: "my-profile", element: <MyProfile /> },
            { path: "post-property", element: <PostPerperty /> },
            { path: "setup-profile", element: <SetupProfile /> },
            { path: "settings", element: <Settings /> },
            { path: "requests", element: <Requests /> },
        ],
    },
]);

export default router;