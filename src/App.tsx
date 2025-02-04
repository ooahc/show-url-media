import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Upload } from 'lucide-react';
import MediaDisplay from './components/MediaDisplay';
import ConfigPanel from './components/ConfigPanel';
import type { MediaParams, DisplayMode } from './types';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaUrl = window.location.pathname.slice(1);

  const params: MediaParams = {
    url: mediaUrl,
    mode: (searchParams.get('mode') as DisplayMode) || 'fill',
    width: searchParams.get('width') ? Number(searchParams.get('width')) : undefined,
    height: searchParams.get('height') ? Number(searchParams.get('height')) : undefined,
    quality: searchParams.get('quality') ? Number(searchParams.get('quality')) : undefined,
  };

  const updateParams = (newParams: MediaParams) => {
    const params = new URLSearchParams();
    if (newParams.mode !== 'fill') params.set('mode', newParams.mode);
    if (newParams.width) params.set('width', newParams.width.toString());
    if (newParams.height) params.set('height', newParams.height.toString());
    if (newParams.quality) params.set('quality', newParams.quality.toString());
    setSearchParams(params);
  };

  if (!mediaUrl) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Upload className="w-16 h-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Media Viewer</h1>
          <p className="text-gray-600 mb-6">
            Add an image or video URL to the end of the current URL to view it with
            customizable display settings.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">URL Parameters:</h2>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li><code>mode</code>: fit | fill | stretch</li>
              <li><code>width</code>: display width in pixels</li>
              <li><code>height</code>: display height in pixels</li>
              <li><code>quality</code>: image quality (1-100)</li>
            </ul>
          </div>
          <a href="https://github.com/ooahc" className="text-gray-600">powered by Oahc</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <MediaDisplay params={params} />
      <ConfigPanel params={params} onUpdate={updateParams} />
    </>
  );
}

export default App;