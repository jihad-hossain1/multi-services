'use server';

export async function verifyUser(info: any) {
    const response = await fetch(`${process.env.PUBLIC_NEXT_URL}/api/v1/auth/verify`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Custom-Header": process.env.NEXT_PUBLIC_NEXT_SECRET as string,
        },
        body: JSON.stringify({...info}),
      });

      const data = await response.json();

      return data;
}
