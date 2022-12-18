import React, { useState } from 'react';
import './App.css';
import Tesseract from "tesseract.js";
import ImageUploader from 'react-images-upload';

function App() {
    const [pictures, setPictures] = useState({});
    const [recognizedText, setRecognizedText] = useState([]);

    const onDrop = picture => {
        setPictures(picture);
    };

    const handleClick = () => {
        const p = pictures[pictures.length - 1];
        const url = URL.createObjectURL(p);
        console.log(url);
        Tesseract
            .recognize(url)
            .then((res) => {
                console.log(res);
                setRecognizedText(res)
            }).catch(console.error)
    };

    const getClasses = () => {
        if (pictures[0])
            return 'btn';
        else
            return 'btn disabled';
    }
    return (
        <div className="App">
            <header className="App-header">
                <ImageUploader
                    className="uploader"
                    withIcon={true}
                    withPreview={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                />
                <button className={getClasses()} onClick={handleClick} disabled={pictures[0] ? false : true}>
                    GO
                </button>
                <h3>Recognized text:</h3>
                <div>
                    {recognizedText ? recognizedText.text : ""}
                </div>
                <br />
                <br />
                <br />
            </header>
        </div>
    );
}


export default App;
