
import { list } from '@vercel/blob';
import fs from 'fs';

async function main() {
    try {
        // 1. Fetch all blobs
        console.log('Fetching blobs...');
        const { blobs } = await list({ limit: 1000 });
        console.log(`Found ${blobs.length} blobs.`);

        // 2. Read services.csv
        const csvContent = fs.readFileSync('services.csv', 'utf-8');
        const lines = csvContent.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const imageIndex = headers.indexOf('image');
        const serviceIdIndex = headers.indexOf('service_id');

        if (imageIndex === -1 || serviceIdIndex === -1) {
            throw new Error('Could not find image or service_id column');
        }

        const newLines = [lines[0]]; // Keep header

        // Helper to find blob by filename (fuzzy match for Vercel suffix and extension)
        const findBlob = (filename) => {
            // Remove extension from search filename
            const namePart = filename.substring(0, filename.lastIndexOf('.'));

            return blobs.find(b => {
                // Get blob filename without extension
                const blobName = b.pathname.substring(0, b.pathname.lastIndexOf('.'));

                // Check if blobName starts with namePart
                if (!blobName.startsWith(namePart)) return false;

                // Check suffix: either exact match or followed by '-'
                if (blobName === namePart) return true;

                const suffix = blobName.slice(namePart.length);
                return suffix.startsWith('-');
            })?.url;
        };

        // Helper to find blobs by prefix (fallback)
        const findBlobsByPrefix = (prefix) => {
            return blobs.filter(b => b.pathname.startsWith(prefix)).map(b => b.url);
        };

        // Process each row
        for (let i = 1; i < lines.length; i++) {
            // Split by comma but respect quotes (simple regex)
            const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            if (parts.length <= imageIndex) {
                newLines.push(lines[i]);
                continue;
            }

            const serviceId = parts[serviceIdIndex].trim();
            const currentImages = parts[imageIndex].replace(/^"|"$/g, '').split(';').map(s => s.trim()).filter(s => s);

            let newImageUrls = [];

            // Strategy 1: Try to match existing filenames
            currentImages.forEach(imgPath => {
                const filename = imgPath.split('/').pop();
                const url = findBlob(filename);
                if (url) {
                    newImageUrls.push(url);
                }
            });

            // Strategy 2: If no images found, try fallback based on service_id
            if (newImageUrls.length === 0) {
                console.log(`No direct matches for ${serviceId}, trying fallback...`);
                let prefix = '';
                if (serviceId === 'hifu') prefix = 'hifu';
                else if (serviceId === 'endosphere') prefix = 'endos';
                else if (serviceId === 'ems') prefix = 'ems';
                else if (serviceId === 'kavitace') prefix = 'kavitace';
                else if (serviceId === 'lpg') prefix = 'lpg';
                else if (serviceId === 'vlasy') prefix = 'hair';
                // For kosmetika/dermapen/etc we don't have a clear single prefix, so we skip fallback to avoid mixing

                if (prefix) {
                    const fallbackUrls = findBlobsByPrefix(prefix);
                    if (fallbackUrls.length > 0) {
                        console.log(`  Found ${fallbackUrls.length} images for prefix '${prefix}'`);
                        newImageUrls = fallbackUrls;
                    }
                }
            }

            // If still no images, keep the old ones (or empty?)
            // User said "update links... according to blob". If blob has nothing, maybe we should leave it empty or keep old broken link?
            // I'll keep old ones if absolutely nothing found, to avoid data loss, but log it.
            if (newImageUrls.length === 0) {
                console.warn(`WARNING: No images found for service ${serviceId}`);
                newImageUrls = currentImages; // Keep old paths
            } else {
                console.log(`Updated ${serviceId}: ${newImageUrls.length} images`);
            }

            // Reconstruct line
            parts[imageIndex] = newImageUrls.join(';'); // No quotes needed inside, but CSV field might need quotes
            // If multiple images, we don't strictly need quotes unless they contain commas. URLs don't contain commas usually.
            // But to be safe, let's quote the field if it has multiple items or special chars.
            // Actually, the original CSV had quotes around description but not always around images.
            // Let's just join with ; and not quote unless needed.
            // Wait, the original parser handles quotes.

            newLines.push(parts.join(','));
        }

        // 3. Write new services.csv
        fs.writeFileSync('services.csv', newLines.join('\n'));
        console.log('services.csv updated successfully.');

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
