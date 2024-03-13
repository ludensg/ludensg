document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the button
    document.getElementById('art-btn').addEventListener('click', function() {
        // Select all elements except for the canvas with the background effect
        const allElements = document.body.getElementsByTagName('*');
        
        // Identify the canvas by checking for the unique style properties set by screen.js
        const backgroundCanvas = document.querySelector('canvas[style*="z-index: -1"]');

        // Loop through all elements and change their visibility
        for (let elem of allElements) {
            // Check if the element is not 'crt', 'crt2', or the background canvas
            if (elem.id !== 'crt' && elem.id !== 'crt2' && elem !== backgroundCanvas) {
                elem.style.visibility = 'hidden'; // Make the element invisible
            }
        }
    });
});
