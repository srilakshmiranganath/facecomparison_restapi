import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'

const Attendance = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const handelCapture = () => {
        const webcam = webcamRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const video = webcam.video;
        const { videoWidth, videoHeight } = video;

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        context.drawImage(video, 0, 0, videoWidth, videoHeight)

        const base64data = canvas.toDataURL('image/png');
        console.log(base64data);

        
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
        </div>
    );
};

export default Attendance;