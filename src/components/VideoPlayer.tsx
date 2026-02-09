'use client'
import React, { useState, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';

interface VideoPlayerProps {
    src: string;
    poster: string;
    loop?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, loop }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="video-player-container" style={{ position: 'relative' }}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls={isPlaying} // Show controls only when the video is playing
                style={{ width: '100%' }} // Adjust video width as needed
                loop={loop}
            />
            {!isPlaying && (
                <Button
                    variant="primary"
                    className="play-button"
                    onClick={handlePlay}
                    style={{
                        position: 'absolute',
                        borderRadius: "100px",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: "5px !important"
                    }}
                >
                    <img src="/images/play.svg" alt="Play" width="40" height="40" /> {/* Adjust the path accordingly */}
                </Button>
            )}
        </div>
    );
};

export default VideoPlayer;
