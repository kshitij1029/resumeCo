import axios from "axios";
import toast from 'react-hot-toast'

//This is an API Layer where we write the code for connecting the backend APIs with the frontend.

const api = axios.create({                 //Axios instance is created to set the default configuration for all the API calls related to authentication. This way we don't have to repeat the baseURL and withCredentials in every API call.
    baseURL:"http://localhost:3000",
    withCredentials:true
})

// export async function register({username, email, password}) {
//     try{
//         const response = await api.post("/register", {  //By default axios does not give access of cookies to the server
//             username, email, password
//         });
//         if(response.status===200){
//             toast.success("Successfully Logged in")
//         }
//         return response.data;

//     } catch (error) {
//         if (error.response && error.response.status === 400) {
//             return toast.error('Invalid email or password');
//         }
//         console.error("Error registering user:", error);
//     }
// }

// export async function login({email, password}) {
//     try{

//         const response = await api.post("/login",{  //By default axios does not give access of cookies to the server
//             email, password
//         });
//         if(response.status===200){
//             toast.success("Successfully Logged in")
//         }
//         return response.data

//     } catch (error) {
//         if (error.response && error.response.status === 400) {
//             return toast.error('Invalid email or password');
//         }
//         console.log(error)
//     }
// }

// export async function logout(){
//     try{
//         const response = await api.post("/logout");

//         return response.data;

//     }catch (error) {
//         console.error("Error logging out user:", error);
//     }
// }

// export async function getMe(){
//     try{
//         const response = await api.get("/get-me");

//         return response.data;

//     }catch (error) {
//         console.error("Error fetching user data:", error);
//     }
// }

export async function register({username,email,password}){
    try {
        const response = await api.post('/api/auth/register',{
            username,email,password
        },{
            // by default axios dont give access to cookies
            withCredentials:true  //now server has access to read cookies data and set it
           // Needed for session-based auth / cookie-based JWT
        })
        if(response.status===200){
            toast.success("Successfully Registered")
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return toast.error('User Already exists with these credentials');
        }
        console.log(error);
        
    }
}

export async function login({email, password}){
    try {
        const response = await api.post('/api/auth/login',{
            email,password
        },{
            withCredentials:true
        })
        if(response.status===200){
            toast.success("Successfully Logged in")
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return toast.error('Invalid email or password');
        }
        console.log(error)
    }
}

export async function logout(){
    try {
        const response= await api.get("/api/auth/logout",{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMe(){
    try {
        const response = await api.get("/api/auth/get-me",{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        console.log(error)
        return null; // Explicitly return null so the UI knows no one is logged in
    }
}