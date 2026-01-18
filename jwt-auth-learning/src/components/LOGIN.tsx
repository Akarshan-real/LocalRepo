import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import {type LoginCredentials } from '../types/auth.types' 

const Login = () => {
  const navigate = useNavigate();
  const { 
      register, 
      handleSubmit, 
      setError, 
      formState: { errors, isSubmitting } 
  } = useForm<LoginCredentials>();

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    try {

    } catch (error) {
        setError("root", { message: "Something went wrong!" });
    }
  }

  return (
    <div className="w-full min-h-screen flex">
      
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
            
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">name</label>
              <input 
                {...register("name", { required: "name is required" })}
                type="name"
                placeholder="mail@site.com"
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all
                   ${errors.name ? 'border-red-500' : 'border-gray-200'}
                `}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all
                   ${errors.password ? 'border-red-500' : 'border-gray-200'}
                `}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
            </div>

            {/* Button */}
            <button 
              disabled={isSubmitting}
              type="submit" 
              className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition duration-300 transform active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Loading...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="font-bold text-black hover:underline">Sign up for free</Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Image (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center relative overflow-hidden">
         {/* Decorative circles/abstract bg */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90"></div>
         <div className="relative z-10 text-white text-center px-10">
            <h2 className="text-4xl font-bold mb-4">"Code like a pro."</h2>
            <p className="text-lg text-blue-100">Join our community of developers today.</p>
         </div>
      </div>

    </div>
  )
}

export default Login