// App.js
import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const app = new Realm.App({ id: "application-0-gscmlfw" }); // Replace with your Realm App ID
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongodb.db("photoCaptureDB").collection("photos");
        const fetchedImages = await collection.find();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Failed to log in", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Images</h1>
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.image} alt={`Image ${index}`} />
            <p>{new Date(image.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
