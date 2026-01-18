import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    // Main Container: Full screen with a subtle gradient background
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      {/* Content Wrapper */}
      <div className="text-center space-y-8 max-w-lg w-full">
        
        {/* Hero Text */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            The App.
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            Where do you want to go today?
          </p>
        </div>

        {/* The Buttons Area */}
        <div className="flex flex-col gap-4 w-full md:w-3/4 mx-auto">
          
          {/* LOGIN BUTTON: Primary Style (Black) */}
          <Link 
            to="/login"
            className="w-full bg-black text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-200 ease-out flex justify-center items-center"
          >
            Login
          </Link>

          {/* SIGNUP BUTTON: Secondary Style (White/Border) */}
          <Link 
            to="/signup"
            className="w-full bg-white text-gray-900 text-lg font-bold py-4 rounded-xl border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-out flex justify-center items-center"
          >
            Sign Up
          </Link>

        </div>

        {/* Footer Text */}
        <p className="text-gray-400 text-sm">
          © 2026 Your Company. All rights reserved.
        </p>

      </div>
    </div>
  )
}

export default App