import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';

const Attendance = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [comparisonResult, setComparisonResult] = useState(null);

    const handelCapture = () => {
        const webcam = webcamRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const video = webcam.video;
        const { videoWidth, videoHeight } = video;

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        context.drawImage(video, 0, 0, videoWidth, videoHeight)

        canvas.toBlob((blob) => {
            const file = new File([blob], 'capture.png', { type: 'image/png'});

            const formData = new FormData();
            formData.append('compare', file);
        

            fetch('http://localhost:8000/compare/', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                setComparisonResult(data);
            })
            .catch(error => {
                console.error(error)
            });
        }, 'image/png');
    };

    return(
        <div>
            <Link to="/">
                <button>HOME</button>
            </Link>
            <Webcam
                ref={webcamRef}
                width={640}
                height={480}
                videoConstraints={{
                    facingMode: 'user',
                }}
                />
            <button onClick={handelCapture}>CAPTURE</button>
            <canvas ref={canvasRef} style={{display: 'none'}}></canvas>
            {comparisonResult && <p>{comparisonResult}</p>}
        </div>
    );
};

export default Attendance;