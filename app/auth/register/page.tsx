"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const customHeaders =  process.env.NEXT_PUBLIC_NEXT_SECRET as string



const RegisterForm = () => {
  const [state, setState] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const [stateErrors, setStateErrors] = useState<any>('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Custom-Header": customHeaders,
        },
        body: JSON.stringify({...state}),
      });

      const data = await response.json();

      setLoading(false);

      if (data.error){

        setStateErrors(data.error)
      }

      if (data.result) {
        toast.success("Registered successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",

          },
          duration: 3000,
          icon: "👏",
        });
        router.push(`/auth/verify/${data?.result?.email}`);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }


  return (
    <section className='min-h-screen flex flex-col items-center justify-center  px-3 py-5 md:py-16'>
      <main className='max-sm:p-5 p-20 bg-[#dedddf02] max-sm:w-full w-[550px] border border-gray-300 shadow-xl drop-shadow-md rounded-lg'>
      <h4 className='text-2xl font-bold mb-5'>Register</h4>
        <form onSubmit={handleRegister} className='flex flex-col gap-1 w-full'>
          {stateErrors && <div className='text-red-500'>{stateErrors}</div>}
          <InputField
          required={true}
            key='01'
            id='name'
            label='Name'
            type='text'
            name='xname'
            onChange={(e)=>setState({ ...state, name: e.target.value })}
            value={state?.name}
            />

          <InputField
          required={true}
            key='02'
            id='email'
            label='Email'
            type='email'
            name='xemail'
            onChange={(e)=>setState({ ...state, email: e.target.value })} value={state?.email} />

          <InputField
          required={true}
            key='05'
            id='password'
            label='Password'
            type='password'
            name='password'
            onChange={(e)=>setState({ ...state, password: e.target.value })} value={state?.password} />

          <div className='mt-6 w-full'>
            <button
              type='submit'
              className='input_btn_2'
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className='text-center mt-8'>
          <h4 className='text-gray-700'>
            Already have an account?{" "}
            <Link
              href='/auth/login'
              className='text-blue-600 hover:underline'
            >
              Login
            </Link>
          </h4>
        </div>
      </main>
    </section>
  );
};

export default RegisterForm;
