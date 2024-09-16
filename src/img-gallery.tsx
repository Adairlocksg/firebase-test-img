import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Importe o storage configurado

export default function ImageGallery() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      // Referência da pasta onde as imagens estão armazenadas
      const imagesRef = ref(storage, "images/");

      // Listar todos os arquivos da pasta
      const result = await listAll(imagesRef);

      // Obter as URLs de download de cada arquivo
      const urls = await Promise.all(
        result.items.map((itemRef) => getDownloadURL(itemRef))
      );

      setImageURLs(urls); // Armazena as URLs no estado
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`image-${index}`}
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}
