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
import AuthProtection from './authProtection.tsx';
import PublicRoute from './publicRoute.tsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserProvider>
                    <SearchProvider>
                            <App />
                    </SearchProvider>
                </UserProvider>,
        errorElement: <h1>Page not found</h1>,
        children: [
            { path: "", element: <Home /> },
            { path: "search", element: <Home /> },
            { path: "property/:id", element: <Property /> },
            { path: "signup", element: <PublicRoute><Signup /></PublicRoute> },
            { path: "profile/:userNameUrl", element: <UserProfile />},
            { path: "my-profile", element: <AuthProtection><MyProfile /></AuthProtection> },
            { path: "post-property", element: <AuthProtection><PostPerperty /></AuthProtection> },
            { path: "setup-profile", element: <AuthProtection><SetupProfile /></AuthProtection> },
            { path: "settings", element: <AuthProtection><Settings /></AuthProtection> },
            { path: "requests", element: <AuthProtection><Requests /></AuthProtection> },
        ],
    },
]);

export default router;