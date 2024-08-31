import React from 'react'
import { TextEditor } from './_comp/TextEditor'
import { serverAuth } from '@/lib/server_session';
import { AuthTextEditor } from './_comp/AuthTextEditor';
import { TextView } from './_comp/TextView';

const CodeSharePage = async ({ params }: { params: { code: string[] } }) => {
  const isAuth:any = await serverAuth();
  console.log("🚀 ~ CodeSharePage ~ isAuth:", isAuth)
  const findAuthLink = await fetch(`${process.env.PUBLIC_NEXT_URL}/api/v1/code-share?code=${params?.code[0]}&type=permanent`);
  const auth_link_json = await findAuthLink.json();

  console.log("🚀 ~ CodeSharePage ~ auth_link_json:", auth_link_json?.result?.authorId)

  const isAuthLink = auth_link_json?.result?.authorId !== isAuth?.userId
  return (
    <div>
        {
          !isAuth && <TextEditor params={params} />
        }
        {
          isAuth && auth_link_json?.result?.authorId == isAuth?.userId ? <AuthTextEditor params={params} /> : null
        }

        {
          isAuthLink  && <TextView auth_link_json={auth_link_json} />
        }
    </div>
  )
}

export default CodeSharePage