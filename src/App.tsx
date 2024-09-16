import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UploadForm from "./upload-form";
import ImageGallery from "./img-gallery";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UploadForm />
      <ImageGallery />
    </>
  );
}

export default App;
