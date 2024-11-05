import React, { useEffect, useState } from 'react';
import climbingImage from "../../public/male-climber-on-overhanging-rock-600nw-501632293.webp"

export function About(props) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(climbingImage);
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
        alt="climbing image" width="1000" height="500"/> 
    </main>
  );
}