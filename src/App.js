import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import useAuthCheck from './hooks/useAuthCheck';

function App() {
  const authChecked = useAuthCheck()

  console.log(authChecked)
  return !authChecked ? "" : <RouterProvider router={router} />
}

export default App;
