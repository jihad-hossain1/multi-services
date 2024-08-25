"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [state, setState] = useState<any>({});

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    return (
        <section className='min-h-screen flex flex-col items-center justify-center  px-3 py-5 md:py-16'>
            <main className='max-sm:p-5 p-20 bg-[#dedddf] border border-gray-300 shadow-xl drop-shadow-md rounded-lg'>
              <h4 className='text-2xl font-bold mb-5'>Login</h4>
                <form className='flex flex-col gap-1 w-full'>
                    <InputField
                        key='02'
                        id='email'
                        label='Email'
                        type='email'
                        name='email'
                        error={
                            state?.errors?.email
                                ? state?.errors?.email[0]
                                : undefined
                        }
                        onChange={function (
                            event: React.ChangeEvent<HTMLInputElement>,
                        ): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                    <InputField
                        key='05'
                        id='password'
                        label='Password'
                        type='password'
                        name='password'
                        error={
                            state?.errors?.password
                                ? state?.errors?.password[0]
                                : undefined
                        }
                        onChange={function (
                            event: React.ChangeEvent<HTMLInputElement>,
                        ): void {
                            throw new Error("Function not implemented.");
                        }}
                    />

                    <div className='mt-6 w-full'>
                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-[#222831] via-[#344955] to-[#344955] text-white py-3 rounded-lg shadow-md hover:from-gray-700 hover:via-gray-800 hover:to-gray-700 uppercase transition duration-500 ease-in-out transform hover:scale-105'
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className='text-center mt-8'>
                    <h4 className='text-gray-700'>
                        Register an account ?{" "}
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
