import { useEffect, useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from '../index';
import { useForm } from "react-hook-form";
import type { SignUpCredentials } from "../../Types/Signup.type";


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const hehe = async () => {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin(userData));
                navigate("/");
            };
        };
        hehe();
    }, []);

    const [error, setError] = useState('');

    const { register, handleSubmit } = useForm<SignUpCredentials>();

    const create = async (data: SignUpCredentials) => {
        setError("");
        try {
            const response = await authService.createAccount(data);
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo className="w-full" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium cursor-pointer text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name : "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email : "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || "Email address must be a valid one"
                                }
                            })}
                        />
                        <Input
                            label="Password : "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                                maxLength: { value: 16, message: "Password must be at most 16 characters" }

                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;

