'use server';

export const forgotPassword = async (info: any)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/common/users/forgot-password`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...info})
        })

        const result = await res.json()

        return result
    } catch (error) {
        console.error("error for forgotPassword action: ", (error as Error).message)
    }
}