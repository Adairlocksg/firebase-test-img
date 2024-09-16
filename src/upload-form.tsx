import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Importe o storage configurado

export default function UploadForm() {
  // Especificar que o estado 'image' é do tipo File ou null
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    setImage(e.target.files[0]); // Garantir que está pegando o primeiro arquivo
  };

  const handleUpload = () => {
    if (!image) return; // Verifica se há uma imagem selecionada

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress); // Atualiza o progresso do upload
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        // Upload concluído com sucesso, obtenha o URL de download
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          console.log("File available at", url);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>Progresso: {progress}%</p>
    </div>
  );
}
