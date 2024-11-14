import React, { useEffect, useState } from 'react';

export function About(props) {
  const [imageUrl, setImageUrl] = useState("");
  const apiKey = import.meta.env.VITE_PIXABAY_ACCESS_KEY;

  useEffect(() => {
    async function fetchClimbingImage() {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_ACCESS_KEY}&q=climbing&image_type=photo&per_page=100`
        );
        const data = await response.json();
        
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const selectedImage = data.hits[randomIndex];
        
        setImageUrl(selectedImage.largeImageURL); // Set the URL of the selected image
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchClimbingImage();
  }, []);

  return (
    <main>
        <p>
            After a year or so of climbing, most climbers feel that they are 
            beginning to plateau. They don't understand that they will not climb a 
            harder grade every session, and they fail to track their progress. 
            The climbing pyramid theory is that to climb a route ranked 1 grade 
            harder, you must climb 2-3 routes that are 1 grade easier. If you log 
            every climb you've ever done, the results appear like a pyramid, with a 
            high quantity of easier climbs as the base and a few, harder routes 
            forming the top. This application helps people track the routes they 
            have climbed and displays their efforts in a pyramid, showing them the 
            progress they really are making.
        </p>
        <img src={imageUrl} 
        alt="climbing image" /> 
    </main>
  );
}
