import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#1e293b', /* Optional: Match your dark theme layout background */
              color: '#fff',
            }
          }} 
        />
        <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
    
  )
}

export default App