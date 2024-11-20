import React from 'react'
import { TextEditor } from './_comp/TextEditor'
import { serverAuth } from '@/lib/server_session';
import { AuthTextEditor } from './_comp/AuthTextEditor';
import { TextView } from './_comp/TextView';

const CodeSharePage = async ({ params }: { params: { code: string[] } }) => {
  const isAuth:any = await serverAuth();
  const findAuthLink = await fetch(`${process.env.PUBLIC_NEXT_URL}/api/v1/code-share?code=${params?.code[0]}&type=permanent`,{
    headers: {
      "Content-Type": "application/json",
     "Custom-Header": process.env.NEXTAUTH_SECRET as string,
    
    },
  });
  const auth_link_json = await findAuthLink.json();

  const isAuthLink = auth_link_json?.result?.authorId !== isAuth?.userId
  return (
    <div>
        {
          !isAuth && !isAuthLink && <TextEditor params={params} />
        }
        {
          isAuth && auth_link_json?.result?.authorId == isAuth?.userId && <AuthTextEditor params={params} />
        } 

        {
          isAuthLink  && <TextView auth_link_json={auth_link_json?.result} />
        }
    </div>
  )
}

export default CodeSharePage