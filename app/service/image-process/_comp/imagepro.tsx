



/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

function ImageProcess() {
    const [loading, setLoading] = useState<boolean>(false);
    const [compressedImagePaths, setCompressedImagePaths] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]); // For showing selected image previews

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const filesArray = Array.from(selectedFiles);
            setFiles(filesArray);

            // Create preview URLs for selected images
            const previews = filesArray.map(file => URL.createObjectURL(file));
            setPreviewUrls(previews); // Set the previews for rendering
        } else {
            console.error('No files selected');
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('No files to upload, please select at least one file');
            console.error('No files to upload');
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file); // Append multiple images
        });

        try {
            setLoading(true);
            const response = await fetch('/api/v1/image-compress', {
                method: 'POST',
                body: formData,
                // Content-Type will be set automatically by the browser
            });

            setLoading(false);
            const data = await response.json();
            console.log("🚀 ~ handleUpload ~ data:", data);
            if (data.imageLinks) {
                setCompressedImagePaths(data.imageLinks); // Array of paths
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div className="App">
            <div className='flex flex-col gap-2'>
                <div>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/jpeg, image/png, image/gif, image/webp, image/jpg" 
                        onChange={handleFileChange} 
                        disabled={loading} // Disable input while uploading
                        style={{ marginBottom: '20px' }} 
                    />
                </div>
                <div>
                    <button 
                        disabled={loading || files.length === 0} // Disable button if no files or during upload
                        onClick={handleUpload} 
                        style={{ marginBottom: '20px' }}
                    >
                        {loading ? 'Compressing...' : 'Compress'}
                    </button>
                </div>
            </div>

            {previewUrls.length > 0 && (
                <div>
                    <h2>Selected Images (Before Compression):</h2>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {previewUrls.map((url, index) => (
                            <img 
                                key={index} 
                                width={200} 
                                height={200} 
                                src={url} 
                                alt={`Selected Image ${index + 1}`} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {compressedImagePaths.length > 0 && (
                <div>
                    <h2>Compressed Images:</h2>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {compressedImagePaths.map((path, index) => (
                            <div key={index}>
                                <img width={200} height={200} src={path} alt={`Compressed ${index + 1}`} />
                                <br />
                                <a href={path} download={`compressed_image_${index + 1}`} style={{ marginTop: '10px', display: 'block' }}>
                                    Download Image {index + 1}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageProcess;


