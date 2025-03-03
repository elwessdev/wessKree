import { createBrowserRouter } from 'react-router-dom'
import { UserProvider } from '../hooks/userContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
import NotFound from '../404/notFound.tsx';
import ForgotPassword from '../Auth/Forgot-password/forgotPassword.tsx';
import EditProperty from '../Profile/EditProperty/EditProperty.tsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserProvider>
                    <SearchProvider>
                            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_GOOGLE}>
                                <App />
                            </GoogleOAuthProvider>
                    </SearchProvider>
                </UserProvider>,
        errorElement: <NotFound />,
        children: [
            { path: "", element: <Home /> },
            { path: "search", element: <Home /> },
            { path: "property/:id", element: <Property /> },
            { path: "signup", element: <PublicRoute><Signup /></PublicRoute> },
            { path: "profile/:userNameUrl", element: <UserProfile />},
            { path: "my-profile", element: <AuthProtection><MyProfile /></AuthProtection> },
            { path: "post-property", element: <AuthProtection><PostPerperty /></AuthProtection> },
            { path: "edit-property", element: <AuthProtection><EditProperty /></AuthProtection> },
            { path: "setup-profile", element: <AuthProtection><SetupProfile /></AuthProtection> },
            { path: "settings", element: <AuthProtection><Settings /></AuthProtection> },
            { path: "requests", element: <AuthProtection><Requests /></AuthProtection> },
            { path: "forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
        ],
    },
]);

export default router;