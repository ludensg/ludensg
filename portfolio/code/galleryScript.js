import { galleryData } from './galleryData.js';

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    const tagsFilterContainer = document.querySelector('.tags-filter');
    let selectedTags = [];

    // Function to create gallery item elements
    function createGalleryItem(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('gallery-item');
        itemElement.setAttribute('data-id', item.id.toString()); // Set the data-id attribute
    
        const image = document.createElement('img');
        image.src = `../portfolio${item.images[0]}`; // Adjust path as necessary
        image.alt = item.title;
        itemElement.appendChild(image);
    
        const titleElement = document.createElement('div');
        titleElement.textContent = item.title;
        titleElement.classList.add('gallery-item-title');
        itemElement.appendChild(titleElement);
    
        const captionElement = document.createElement('div');
        captionElement.textContent = item.subtitle; // Assuming you want the subtitle as the caption
        captionElement.classList.add('gallery-item-caption');
        itemElement.appendChild(captionElement);
    
        const tagsElement = document.createElement('div');
        tagsElement.classList.add('gallery-item-tags');
        item.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.textContent = tag;
            tagSpan.classList.add('gallery-tag');
            tagsElement.appendChild(tagSpan);
        });
        itemElement.appendChild(tagsElement);
        return itemElement;
    }
    // Within DOMContentLoaded event
    // Populate gallery initially
    updateGalleryDisplay();
    attachClickListenersToGalleryItems();
    
    

    function attachClickListenersToGalleryItems() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                // Assuming you have a function to handle opening the modal
                openModalWithItemDetails(this);
            });
        });
    }    

    function openModalWithItemDetails(itemElement) {
        const itemId = itemElement.getAttribute('data-id');
        // Convert itemId to the correct type if necessary
        const itemDetails = galleryData.find(item => item.id.toString() === itemId);
    
        if (itemDetails) {
            populateModal(itemDetails);
            openModal();
        } else {
            console.error('Item details not found for id:', itemId);
        }
    }
    
    

    // Function to update gallery display based on selected tags
    function updateGalleryDisplay() {
        galleryContainer.innerHTML = ''; // Clear current gallery items
        galleryData.forEach(item => {
            if (selectedTags.every(tag => item.tags.includes(tag))) {
                const galleryItemElement = createGalleryItem(item);
                galleryContainer.appendChild(galleryItemElement);
            }
        });
    }

    // Extract and deduplicate tags
    const allTags = galleryData.flatMap(item => item.tags);
    const uniqueTags = [...new Set(allTags)];

    // Populate tags filter and add click event for filtering
    uniqueTags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            if (selectedTags.includes(tag)) {
                selectedTags = selectedTags.filter(t => t !== tag);
            } else {
                selectedTags.push(tag);
            }
            updateGalleryDisplay(); // Refresh gallery display based on the updated selectedTags
            attachClickListenersToGalleryItems(); // Reattach click listeners to the new gallery items
        });
        tagsFilterContainer.appendChild(button);
    });
    
});


// Assuming you've already populated your gallery items and they have a data-id attribute

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      const itemId = this.getAttribute('data-id'); // Assume each item has a unique ID
      const galleryItem = galleryData.find(item => item.id === itemId); // Find the item in your data
      populateModal(galleryItem);
      openModal();
    });
  });
  
    function populateModal(item) {
        const modalTitle = document.getElementById('modalTitle');
        const modalSubtitle = document.getElementById('modalSubtitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');
        const slideshowContainer = document.getElementById('slideshowContainer');

        if (!slideshowContainer) {
            console.error('slideshowContainer not found');
            return;
        }

        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modalDate.textContent = item.date;
        modalSubtitle.textContent = item.subtitle;
        slideshowContainer.innerHTML = ''; // Clear previous slideshow content

        let currentSlideIndex = 0;
        const slides = []; // To store created image elements for easier access later

        // Create and append images
        // Populate slideshow with images
        item.images.forEach((image, index) => {
            // Create an anchor element wrapping the image
            const imageLink = document.createElement('a');
            imageLink.href = `../portfolio${image}`; // Set the href to the image's URL
            imageLink.target = '_blank'; // Ensures link opens in a new tab
            imageLink.classList.add('slide-image-link'); // Optional: for styling purposes

            // Create the image element
            const img = document.createElement('img');
            img.src = `../portfolio${image}`;
            img.classList.add('slide-image');
            img.style.opacity = index === 0 ? '1' : '0'; // Only the first image is fully visible initially

            // Append the image to the anchor, and then append the anchor to the slideshow container
            imageLink.appendChild(img);
            slideshowContainer.appendChild(imageLink);
        });


        // Only append arrows if there are multiple images
        if (item.images.length > 1) {
            const leftArrow = document.createElement('div');
            leftArrow.innerHTML = '&#9664;';
            leftArrow.classList.add('left-arrow');

            const rightArrow = document.createElement('div');
            rightArrow.innerHTML = '&#9654;';
            rightArrow.classList.add('right-arrow');

            slideshowContainer.appendChild(leftArrow);
            slideshowContainer.appendChild(rightArrow);

            // Function to navigate through images with crossfade effect
            function showSlide(nextIndex) {
                slides[currentSlideIndex].style.opacity = '0'; // Fade out current image
                currentSlideIndex = (nextIndex + slides.length) % slides.length; // Calculate the correct index
                slides[currentSlideIndex].style.opacity = '1'; // Fade in next image
            }

            leftArrow.addEventListener('click', () => showSlide(currentSlideIndex - 1));
            rightArrow.addEventListener('click', () => showSlide(currentSlideIndex + 1));
        }
    }

  
  
  function openModal() {
    document.getElementById('galleryModal').style.display = 'block';
    disableScrolling();
  }
  
  function closeModal() {
    document.getElementById('galleryModal').style.display = 'none';
    enableScrolling();
  }
  
  document.querySelector('.close').addEventListener('click', function() {
    closeModal();
  });
  

  function disableScrolling(){
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed'; // Lock the body's position
    document.body.style.width = '100%'; // Prevent width from being inadvertently set to less than the viewport width
}

function enableScrolling(){
    document.body.removeEventListener('touchmove', preventDefault, { passive: false });
    document.body.style.overflow = '';
    document.body.style.position = '';
}

function preventDefault(e){
    e.preventDefault();
}
