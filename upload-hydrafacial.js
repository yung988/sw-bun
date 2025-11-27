import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function uploadHydrafacial() {
    console.log('🚀 Uploading hydrafacial image...\n');

    try {
        const filePath = './images/hydrafacial.jpeg';
        const fileBuffer = await readFile(filePath);

        const blob = await put('hydrafacial.jpeg', fileBuffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        console.log(`✅ Uploaded: hydrafacial.jpeg`);
        console.log(`📎 URL: ${blob.url}\n`);

        return blob.url;
    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadHydrafacial();
