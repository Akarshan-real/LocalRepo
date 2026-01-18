import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

// Only Name and Password now
interface SignupCredentials {
    name: string;
    password: string;
}

const Signup = () => {
    const navigate = useNavigate();
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<SignupCredentials>();

    const onSubmit: SubmitHandler<SignupCredentials> = async (data) => {
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        console.log("Creating User:", data);
        navigate('/login');
    }

    return (
        <div className="w-full min-h-screen flex">
            
            {/* LEFT SIDE: Image */}
            <div className="hidden lg:flex w-1/2 bg-black items-center justify-center relative">
                 <div className="absolute inset-0 bg-gray-900">
                    {/* Placeholder for image */}
                 </div>
                 <div className="relative z-10 text-white px-12">
                    <h2 className="text-5xl font-bold mb-6">Join the squad.</h2>
                    <p className="text-gray-400 text-xl">Sign up in seconds.</p>
                 </div>
            </div>

            {/* RIGHT SIDE: The Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 md:px-16 lg:px-24 py-10">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-500 mb-8">Enter your details below.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input 
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition-all
                                    ${errors.name ? 'border-red-500' : 'border-gray-200'}
                                `}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input 
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 chars" }
                                })}
                                type="password"
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition-all
                                    ${errors.password ? 'border-red-500' : 'border-gray-200'}
                                `}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center"
                        >
                            {isSubmitting ? "Creating..." : "Sign Up"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:underline">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup