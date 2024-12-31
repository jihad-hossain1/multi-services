"use client";

import React, { useState } from "react";
import { forgotPassword } from "./action";
// import { TbLoaderQuarter } from "react-icons/tb";
import {InputField} from "@/components/ui/InputField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/auth/login`;

const ForgotForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [forgotAction, setForgotAction] = useState(false);
  const [codeFormData, setCodeFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
    email: ""
  });
  const [confirmAction, setConfirmAction] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setForgotAction(false);
    try {
      setLoading(true);
      const response = await forgotPassword({ code: btoa(JSON.stringify({ email: formData.email })) });
      setLoading(false);

      if(response?.required) {
        toast.error("Please enter a valid field");
        return;
      }

      if (response?.notfound) {
        setErrors({ notfound: "Email not found" });
        return;
      }

      if (response?.result) {
        setCodeFormData((prev) => ({
          ...prev,
          email: response?.result?.email
        }))
        toast.success("Check your email for the reset code");
        setForgotAction(true);
        return;
      }
    } catch (error) {
      console.error("error for forgotPassword action: ", (error as Error).message);
    }
  };

  const handleCheckcode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      setLoading(true);
      const response = await forgotPassword({ type: btoa(JSON.stringify({ email: formData.email, code: codeFormData.code })) });
      setLoading(false);

      if(response?.required) {
        toast.error("Please enter a valid field");
        return;
      }

      if (response?.notfound) {
        toast.error("User not found");
        return;
      }

      if (response?.codeValid) {
        setErrors({ codeValid: "Please enter a valid code, code are not match" });
        return;
      }

      if (response?.result) {
        toast.success("Code reset successfully");
        setConfirmAction(true);
        return;
      }
    } catch (error) {
      console.error("error for forgotPassword action: ", (error as Error).message);
    }
  };

  const handleConfirmPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if(codeFormData.newPassword !== codeFormData.confirmPassword) {
      toast.error("Password not match, please check again");
      return;
    }
    if(codeFormData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      const response = await forgotPassword({ confirm: btoa(JSON.stringify({ email: codeFormData.email, newPassword: codeFormData.newPassword })) });
      setLoading(false);

      if(response?.required) {
        toast.error("Please enter a valid field");
        return;
      }

      if (response?.error) {
        toast.error('Something went wrong');
        return;
      }

      if (response?.result) {
        toast.success("Password changed successfully");
        router.push(redirectUrl);
        return;
      }
    } catch (error) {
      console.error("error for forgotPassword action: ", (error as Error).message);
    }
  };


  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      {
        !forgotAction && !confirmAction && (<form onSubmit={handleSubmit} className='flex flex-col gap-3 border border-[#e5e7eb] rounded-lg p-4 md:p-10 w-full md:w-[600px]'>
          <div className='flex flex-col gap-3'>
            <h4 className='text-center font-semibold text-2xl'>Forget your password?</h4>
            <h4 className='mt-4 text-sm'>Please enter the account for which you want to reset the password.</h4>
          </div>
          <div>
            <InputField label='Email' type='email' name='email' id='email' required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            {errors?.notfound && <p className='text-red-600 text-sm mt-1'>{errors?.notfound}</p>}
          </div>
          <div className='flex justify-end mt-2'>
            <button className='btn_comp_color_yellow' disabled={loading} type='submit'>
              {loading ? (
                <span className='flex items-center gap-2'>
                  <span>Sending</span>
                  {/* <TbLoaderQuarter className='animate-spin h-5 w-5' /> */}
                </span>
              ) : (
                "Forgot"
              )}
            </button>
          </div>
          <div className="flex start">
           <h4>Back to <a href="/auth/login" className='text-blue-600 hover:underline'>login</a> </h4> 
          </div>
        </form>)
      }
      {
        !confirmAction && forgotAction && (
          <form className='flex flex-col gap-3 border border-[#e5e7eb] rounded-lg p-4 md:p-10 w-full md:w-[600px]' onSubmit={handleCheckcode}>
            <div className='flex flex-col gap-3'>
            <h4 className='text-center font-semibold text-2xl'>Verify your identity</h4>
            <h4 className='mt-4 text-sm'>Please enter the OTP via <span className='font-semibold'>{codeFormData?.email}</span> to continue</h4>
          </div>
            <div>
              <InputField label='Code' type='text' name='code' id='code' required value={codeFormData.code} onChange={(e) => setCodeFormData({ ...codeFormData, code: e.target.value })} />
              {errors?.codeValid && <p className='text-red-600 text-sm mt-1'>{errors?.codeValid}</p>}
            </div>
            <div className='flex justify-end mt-2'>
              <button className='btn_comp_color_yellow' disabled={loading} type='submit'>
                {loading ? (
                  <span className='flex items-center gap-2'>
                    <span>Sending</span>
                    {/* <TbLoaderQuarter className='animate-spin h-5 w-5' /> */}
                  </span>
                ) : (
                  "Reset"
                )}
              </button>

            </div>
          </form>
        )
      }
      {
        confirmAction && (
          <form className='flex flex-col gap-3 border border-[#e5e7eb] rounded-lg p-4 md:p-10 w-full md:w-[600px]' onSubmit={handleConfirmPassword}>
 <div className='flex flex-col gap-3'>
            <h4 className='text-center font-semibold text-2xl'>Enter your new password?</h4>
            <h4 className='mt-4 text-sm'>New password and confirm password should be same & at least 6 characters .</h4>
          </div>
            <div>
              <InputField label='New Password' type='text' name='newPassword' id='newPassword' required value={codeFormData.newPassword} onChange={(e) => setCodeFormData({ ...codeFormData, newPassword: e.target.value })} />
              {/* {errors?.codeValid && <p className='text-red-600 text-sm mt-1'>{errors?.codeValid}</p>} */}
            </div>
            <div>
              <InputField label='Confirm Password' type='text' name='confirmPassword' id='confirmPassword' required value={codeFormData.confirmPassword} onChange={(e) => setCodeFormData({ ...codeFormData, confirmPassword: e.target.value })} />
              {/* {errors?.codeValid && <p className='text-red-600 text-sm mt-1'>{errors?.codeValid}</p>} */}
            </div>
            <div className='flex justify-end mt-2'>
              <button className='btn_comp_color_yellow' disabled={loading} type='submit'>
                {loading ? (
                  <span className='flex items-center gap-2'>
                    <span>Sending</span>
                    {/* <TbLoaderQuarter className='animate-spin h-5 w-5' /> */}
                  </span>
                ) : (
                  "Reset"
                )}
              </button>

            </div>
          </form>
        )
      }
    </div>
  );
};

export default ForgotForm;
