'use client';

import React from "react";

import { ReactTransliterate, Language } from "react-transliterate";
import "react-transliterate/dist/index.css";

interface IProps {
    formData: any
    setFormData: any;
    lang: Language
}

const ContentWrite: React.FC<IProps> = ({ formData, setFormData, lang }) => {

    return (
        <div style={{ padding: "5px", maxWidth: "100%" }}>

            <ReactTransliterate
                renderComponent={(props) => <textarea {...props} rows={4} />}
                value={formData.content}
                onChangeText={(text) => setFormData({ ...formData, content: text })}
                lang={lang}
                style={{
                    width: "100%",
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
        </div>
    );
};

export default ContentWrite;


