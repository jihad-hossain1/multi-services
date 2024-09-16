
import { NextResponse, NextRequest } from 'next/server';

const processImage = async (buffer: Buffer, filename: string): Promise<string> => {
  const sharp = (await import('sharp')).default;
  const path = (await import('path')).default;
  const fs = (await import('fs')).promises;

  const uploadDir = path.join(process.cwd(), 'uploads');
  const resizedDir = path.join(process.cwd(), 'resized');

  // Ensure directories exist
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.mkdir(resizedDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  const outputFilePath = path.join(resizedDir, `${filename}.jpg`);

  try {
    // Save the buffer to a file
    await fs.writeFile(filePath, buffer);

    // Resize and compress image using sharp
    await sharp(filePath)
      .resize(800, 600) // width x height
      .jpeg({ quality: 60 }) // Compression handled by sharp
      .toFile(outputFilePath);

    // Return the path of the compressed image
    return outputFilePath;
  } catch (error) {
    throw new Error(`Error processing image: ${(error as Error).message}`);
  } finally {
    // Clean up uploaded image (uploaded to 'uploads' folder)
    await fs.unlink(filePath);
  }
};

const uploadToImgBB = async (filePath: string): Promise<string> => {
  const fs = (await import('fs')).promises;
  const fetch = (await import('node-fetch')).default;

  const apiKey = process.env.IMG_BB_API_KEY; // Replace with your ImgBB API key
  const fileBuffer = await fs.readFile(filePath);
  const base64Image = fileBuffer.toString('base64');

  const formData = new URLSearchParams();
  formData.append('image', base64Image);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.data.url; // Return the image URL
    } else {
      throw new Error('Failed to upload image to ImgBB');
    }
  } catch (error) {
    throw new Error(`Error uploading to ImgBB: ${(error as Error).message}`);
  }
};

export async function POST(request: NextRequest) {
  const fs = (await import('fs')).promises;

  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[]; // Cast to File[]

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const imageLinks: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const compressedImagePath = await processImage(buffer, file.name);

      // Upload the compressed image to ImgBB and get the link
      const imageUrl = await uploadToImgBB(compressedImagePath);
      imageLinks.push(imageUrl);

      // After the image is uploaded, delete the compressed image file
      await fs.unlink(compressedImagePath);
    }

    return NextResponse.json({ success: true, imageLinks });
  } catch (error) {
    return NextResponse.json({ error: "File upload failed", details: (error as Error).message }, { status: 500 });
  }
}




// import { NextResponse, NextRequest } from 'next/server';

// const processImage = async (buffer: Buffer, filename: string): Promise<string> => {
//   const sharp = (await import('sharp')).default;
//   const path = (await import('path')).default;
//   const fs = (await import('fs')).promises;

//   const uploadDir = path.join(process.cwd(), 'uploads');
//   const resizedDir = path.join(process.cwd(), 'resized');

//   // Ensure directories exist
//   await fs.mkdir(uploadDir, { recursive: true });
//   await fs.mkdir(resizedDir, { recursive: true });

//   const filePath = path.join(uploadDir, filename);
//   const outputFilePath = path.join(resizedDir, `${filename}.jpg`);

//   try {
//     // Save the buffer to a file
//     await fs.writeFile(filePath, buffer);

//     // Resize and compress image using sharp
//     await sharp(filePath)
//       .resize(800, 600) // width x height
//       .jpeg({ quality: 60 }) // Compression handled by sharp
//       .toFile(outputFilePath);

//     // Return the path of the compressed image
//     return outputFilePath;
//   } catch (error) {
//     throw new Error(`Error processing image: ${(error as Error).message}`);
//   } finally {
//     // Clean up uploaded images
//     await fs.unlink(filePath);
//   }
// };

// const uploadToImgBB = async (filePath: string): Promise<string> => {
//   const fs = (await import('fs')).promises;
//   const fetch = (await import('node-fetch')).default;

//   const apiKey = '646f6e46bb244c91bad69897323f238a'; // Replace with your ImgBB API key
//   const fileBuffer = await fs.readFile(filePath);
//   const base64Image = fileBuffer.toString('base64');

//   const formData = new URLSearchParams();
//   formData.append('image', base64Image);

//   try {
//     const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await response.json();
//     if (data.success) {
//       return data.data.url; // Return the image URL
//     } else {
//       throw new Error('Failed to upload image to ImgBB');
//     }
//   } catch (error) {
//     throw new Error(`Error uploading to ImgBB: ${(error as Error).message}`);
//   }
// };

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const files = formData.getAll('images') as File[]; // Cast to File[]

//     if (files.length === 0) {
//       return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
//     }

//     const imageLinks: string[] = [];

//     for (const file of files) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const compressedImagePath = await processImage(buffer, file.name);
//       const imageUrl = await uploadToImgBB(compressedImagePath); // Upload to ImgBB and get the link
//       imageLinks.push(imageUrl);
//     }

//     return NextResponse.json({ success: true, imageLinks });
//   } catch (error) {
//     return NextResponse.json({ error: "File upload failed", details: (error as Error).message }, { status: 500 });
//   }
// }
