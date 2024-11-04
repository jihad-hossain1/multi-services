'use client';

import React, { useState } from 'react'
import ContentWrite from './contentWrite'
import toast from 'react-hot-toast';

const Form = () => {
    const [formData, setFormData] = useState({
        content: ""
    })
    const [lang, setLang] = useState<any>("bn");


    const handleLanguageToggle = () => {
        setLang((prevLanguage: any) =>
            prevLanguage === "bn" ? "en" : "bn",
        );
    };

    return (
        <div>
            <div className='flex gap-2 items-center'>
                <label
                    htmlFor='textarea'
                    className='input-label'
                >
                    Language Default ( Bangla )
                </label>
                <div className='flex gap-2'>
                    <input
                        type='checkbox'
                        name='language-toggle'
                        id='language-toggle'
                        checked={lang == "en" }
                        onChange={handleLanguageToggle}
                    />
                    <label
                        htmlFor='language-toggle'
                        className='input-label'
                    >
                        {lang === "en" ? "English" : "English"}
                    </label>
                </div>
            </div>
            <ContentWrite formData={formData} setFormData={setFormData} lang={lang} />
            <div>
                {
                    formData?.content && <>  <h4 className='font-semibold'>Writen Content:</h4>
                        <button onClick={() => {
                            navigator.clipboard.writeText(formData.content);
                            toast.success('Successfull, Check Your Clipboard')
                            }} className='text-[white] border bg-[green] px-3 text-sm py-1 shadow-sm hover:underline'>Copy Content</button>
                        <div className='text-sm overflow-auto'>
                            <p>
                                {formData?.content}
                            </p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Form