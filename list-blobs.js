
import { list } from '@vercel/blob';

async function main() {
    try {
        const { blobs } = await list();
        console.log(JSON.stringify(blobs, null, 2));
    } catch (error) {
        console.error('Error listing blobs:', error);
    }
}

main();
