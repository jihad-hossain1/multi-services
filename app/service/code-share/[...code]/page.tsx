import React from 'react'
import { TextEditor } from './_comp/TextEditor'

const CodeSharePage = ({ params }: { params: { code: string[] } }) => {
  return (
    <div>
        <TextEditor params={params} />
    </div>
  )
}

export default CodeSharePage