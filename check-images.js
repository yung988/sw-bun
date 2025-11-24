
const fs = require('fs');
const path = require('path');

// Read files
const services = fs.readFileSync('services.csv', 'utf-8');
const uploaded = JSON.parse(fs.readFileSync('uploaded-images.json', 'utf-8'));

// Parse CSV (simple parser for this check)
const lines = services.trim().split('\n');
const headers = lines[0].split(',').map(h => h.trim());
const imageIndex = headers.indexOf('image');

const missingImages = [];
const mappedImages = [];

for (let i = 1; i < lines.length; i++) {
    // Handle quoted fields roughly
    const parts = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    // Debug log for first line
    if (i === 1) {
        console.log('Header:', headers);
        console.log('Image Index:', imageIndex);
        console.log('Parts length:', parts.length);
        console.log('Parts:', parts);
    }

    const imageField = parts[imageIndex];

    if (imageField) {
        // Remove quotes if present
        const cleanField = imageField.replace(/^"|"$/g, '');
        const images = cleanField.split(';');

        images.forEach(imgPath => {
            const cleanPath = imgPath.trim();
            if (!cleanPath) return;

            const filename = cleanPath.split('/').pop();
            if (uploaded[filename]) {
                mappedImages.push({ original: cleanPath, url: uploaded[filename] });
            } else {
                missingImages.push(cleanPath);
            }
        });
    }
}

console.log(`Total mapped: ${mappedImages.length}`);
console.log(`Total missing: ${missingImages.length}`);

if (missingImages.length > 0) {
    console.log('Missing images:');
    missingImages.forEach(img => console.log(`- ${img}`));
}
