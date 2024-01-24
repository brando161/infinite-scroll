const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Unsplash API
const count = 30;
const query = 'car';
const apiKey = 'API_KEY_PLACEHOLDER';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${count}`;

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
    }
}

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, Add to DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images', totalImages);
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Check when each image is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside image-container Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch(error) {
        console.log(error)
    }
}

// Load more photos when scrolling is near bottom of page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
})

//On Load
getPhotos();