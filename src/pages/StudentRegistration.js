import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/image/learningportal.svg"
import { useRegisterMutation } from '../features/auth/authApi';

const StudentRegistration = () => {

    const [registerError, setRegisterError] = useState("")

    const navigate = useNavigate()

    const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation()

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value

        if (password.length < 6) {
            setRegisterError("Password should be 6 characters or numbers")
        }

        else if (password !== confirmPassword) {
            setRegisterError("Passwords do not match")
        }
        else {
            const data = {
                name,
                email,
                password,
                role: "student"
            }

            register(data)
                .then(res => {
                    if (res.data.accessToken) {
                        navigate("/course-player")
                    }
                })
        }

    }
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={logo} alt="" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Create Your New Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="name" autocomplete="name" required
                                className="login-input rounded-t-md" placeholder="Student Name" />
                        </div>
                        <div>
                            <label for="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required
                                className="login-input " placeholder="Email address" />
                        </div>
                        <div>
                            <label for="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required
                                className="login-input" placeholder="Password" />
                        </div>
                        <div>
                            <label for="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirmPassword" type="password"
                                required className="login-input rounded-b-md"
                                placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link to="/" className="font-medium text-violet-600 hover:text-violet-500">
                                Already have an account? Please Login.
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            <p className="font-medium text-red-600">
                                {registerError && registerError}
                                {isError && error}
                            </p>
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </section>

    );
};

export default StudentRegistration;