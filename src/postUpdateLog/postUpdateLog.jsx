import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink,} from 'react-router-dom';

export function PostUpdateLog() {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("")

  useEffect(() => {
    async function fetchClimbingImage() {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_ACCESS_KEY}&q=climbing&image_type=photo&per_page=100`
        );
        const data = await response.json();
        
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const selectedImage = data.hits[randomIndex];
        
        setImageURL(selectedImage.largeImageURL); // Set the URL of the selected image
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchClimbingImage();
  }, []);

  const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/UpdateLog');
  }


  return (
    <main>
        <hr />
        <h2>Congrats for adding to your pyramid!</h2>
        <img src={imageURL} 
        alt="climbing image" width="1000" height="500"/>    
        <p>This will be an api to pull various climbing images</p>
        <NavLink to="/updateLog">
          <button className="btn btn-primary">Continue Logging</button>
        </NavLink>
    </main>
  );
}