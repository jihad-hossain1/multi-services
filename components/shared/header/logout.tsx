'use client'

import Loader from '@/components/svg/loader';
import useAuth from '@/helpers/hook/useAuth';
import React from 'react'
import toast from 'react-hot-toast';

const custom_secret = `${process.env.NEXT_PUBLIC_NEXT_SECRET}`

const Logout = () => {
        const { setIsAdd,setAuth } = useAuth();

        const [loading, setLoading] = React.useState(false);
        const [outSuccess, setOutSuccess] = React.useState(false);
        
        const handleLogout = async () => {
          try {
            setLoading(true);
            const response = await fetch("/api/v1/auth/logout",{
              headers: {
                "Content-Type": "application/json",
                'Custom-Header': custom_secret
              },
              method: "GET",
            });

            setLoading(false);
            const data = await response.json();

            if (data.success) {
              toast.success("Logout Successful");
              setOutSuccess(true);
              setIsAdd(false);
              setAuth(null as any);
            }
          } catch (error) {}
        };

  return (
    <button onClick={handleLogout} className="link" disabled={loading}>
      {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Logout"}
    </button>
  );
}

export default Logout