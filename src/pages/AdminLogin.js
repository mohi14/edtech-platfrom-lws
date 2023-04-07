import React, { useState } from 'react';
import logo from "../assets/image/learningportal.svg"
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

const AdminLogin = () => {
    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [loginError, setLoginError] = useState("")


    const handleSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value;
        const password = form.password.value;

        const data = {
            email,
            password
        }

        login(data)
            .then(res => {
                if (res.data.user.role === 'admin') {
                    form.reset()
                    setLoginError("")
                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: res.data.accessToken,
                        user: res.data.user
                    }))

                    dispatch(userLoggedIn({
                        accessToken: res.data.accessToken,
                        user: res.data.user
                    }))

                    navigate("/admin/dashboard")
                }
                else if (res.data.user.role === 'student') {
                    setLoginError("Please put valid Admin email and password!")
                }
            })
    }
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <img className="h-12 mx-auto" src={logo} alt='' />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Sign in to Admin Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required
                                className="login-input rounded-t-md" placeholder="Email address" />
                        </div>
                        <div>
                            <label for="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required
                                className="login-input rounded-b-md" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link to="/" className="font-medium text-violet-600 hover:text-violet-500">
                                Student Login
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-sm">
                            <p className="font-medium text-red-600">
                                {loginError && loginError}
                                {isError && error}
                            </p>
                        </div>
                    </div>

                    <div>
                        <button disabled={isLoading} type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AdminLogin;