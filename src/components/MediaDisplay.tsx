import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { MediaDisplayProps } from '../types';

const MediaDisplay: React.FC<MediaDisplayProps> = ({ params }) => {
  const [error, setError] = React.useState(false);
  const isVideo = /\.(mp4|webm)$/i.test(params.url);
  
  const containerStyle: React.CSSProperties = {
    width: params.width || '100%',
    height: params.height || '100vh',
    overflow: 'hidden',
  };

  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: params.mode === 'fit' ? 'contain' : 
               params.mode === 'fill' ? 'cover' : 
               'fill',
  };

  const handleError = () => setError(true);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center text-red-500">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Media Load Error</h2>
          <p className="mt-2">Unable to load media from URL</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {isVideo ? (
        <video
          style={mediaStyle}
          controls
          autoPlay
          loop
          onError={handleError}
          src={params.url}
        />
      ) : (
        <img
          style={mediaStyle}
          src={`${params.url}${params.quality ? `?q=${params.quality}` : ''}`}
          alt="Media content"
          onError={handleError}
        />
      )}
    </div>
  );
};

export default MediaDisplay;