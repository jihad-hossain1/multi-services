"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import Loader from "@/components/svg/loader";
import Link from "next/link";;
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { userLogin } from "./server-action";

const LoginForm = () => {
  const [state, setState] = useState<any>({
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
      setStateErrors('');
      const response = await userLogin({...state});
      setLoading(false);
      if(response?.error){
        setStateErrors(response?.error)
      }

      if (response?.success) {
        toast.success("Login Successful");
        setStateErrors('');
        setState({
          email: "",
          password: "",
        });
        router.push("/");

      }
    } catch (error) {
      setLoading(false);
    }
  }


  return (
    <section className='min-h-screen flex flex-col items-center justify-center  px-3 py-5 md:py-16'>
      <main className='max-sm:p-5 p-20 bg-[#dedddf02] max-sm:w-full w-[550px] border border-gray-300 shadow-xl drop-shadow-md rounded-lg'>
      <h4 className='text-2xl font-bold mb-5'>Login</h4>
        <form onSubmit={handleRegister} className='flex flex-col gap-1 w-full'>
          {stateErrors && <div className='text-red-500 flex items-center gap-2'>{stateErrors} {stateErrors =="User not verifyed" && <Link href={`/auth/verify/${state?.email}`} className='text-blue-600 hover:underline'>Verify</Link>} </div>}
          
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
              className='input_btn_2 flex items-center justify-center'
            >
              {loading ? <Loader className='w-5 h-5 animate-spin'  /> : "Login"}
            </button>
          </div>
        </form>
        <div className='text-center mt-8'>
          <h4 className='text-gray-700'>
            You don&apos;t have an account?{" "}
            <Link
              href='/auth/register'
              className='text-blue-600 hover:underline'
            >
              Register
            </Link>
          </h4>
        </div>
      </main>
    </section>
  );
};

export default LoginForm;
