import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import Generate from './features/interview/pages/Generate'
import Interview from './features/interview/pages/interview'
import Home from './features/others/pages/Home'



export const router = createBrowserRouter([
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/generate",
        element: <Protected><Generate/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview/></Protected>
    }
])