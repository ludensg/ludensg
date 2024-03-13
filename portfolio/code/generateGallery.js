// run with: 'node generateGallery.js'
const fs = require('fs');
const path = require('path');

// Navigate up one directory to access the gallery folder
const galleryFolder = path.join(__dirname, '..'); 
const outputFilePath = path.join(__dirname, 'galleryData.js'); // Output file in the same "code" directory

let itemId = 1; // Initialize item ID counter

function readGalleryFolder(folderPath) {
    let galleryItems = [];
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });

    entries.forEach(entry => {
        // Skip the "code" folder
        if (entry.isDirectory() && entry.name !== 'code') {
            const itemFolder = path.join(folderPath, entry.name);
            const itemData = { id: itemId++, images: [], title: "", subtitle: "", description: "", tags: [], date: "" };

            // Read image files and text file
            const itemFiles = fs.readdirSync(itemFolder);
            itemFiles.forEach(file => {
                const fullPath = path.join(itemFolder, file);
                if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) {
                    itemData.images.push(fullPath.replace(galleryFolder, ''));
                } else if (file.endsWith('.txt')) {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    const lines = content.split('\n');
                    // Assuming specific order: title, subtitle, description, tags, date
                    itemData.title = lines[0];
                    itemData.subtitle = lines[1];
                    itemData.description = lines[2];
                    itemData.tags = lines[3].split(',').map(tag => tag.trim());
                    itemData.date = lines[4]; // Extracting date from the fifth line
                }
            });

            galleryItems.push(itemData);
        }
    });

    return galleryItems;
}

function generateGalleryFile(galleryItems) {
    const content = `const galleryData = ${JSON.stringify(galleryItems, null, 2)};\nexport { galleryData };`;
    fs.writeFileSync(outputFilePath, content);
}

const galleryItems = readGalleryFolder(galleryFolder);
generateGalleryFile(galleryItems);
