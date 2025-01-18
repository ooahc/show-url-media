import React from 'react';
import { Settings, X } from 'lucide-react';
import type { MediaParams, DisplayMode } from '../types';

interface ConfigPanelProps {
  params: MediaParams;
  onUpdate: (params: MediaParams) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ params, onUpdate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const updateParams = (updates: Partial<MediaParams>) => {
    onUpdate({ ...params, ...updates });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 z-50"
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Display Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Display Mode
                </label>
                <select
                  value={params.mode}
                  onChange={(e) => updateParams({ mode: e.target.value as DisplayMode })}
                  className="w-full p-2 border rounded"
                >
                  <option value="fit">Fit (Maintain Aspect Ratio)</option>
                  <option value="fill">Fill (Cover)</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Width (pixels)
                </label>
                <input
                  type="number"
                  value={params.width || ''}
                  onChange={(e) => updateParams({ width: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full p-2 border rounded"
                  placeholder="Auto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Height (pixels)
                </label>
                <input
                  type="number"
                  value={params.height || ''}
                  onChange={(e) => updateParams({ height: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full p-2 border rounded"
                  placeholder="Auto"
                />
              </div>

              {mediaType === 'image' && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quality (1-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={params.quality || ''}
                    onChange={(e) => updateParams({ quality: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full p-2 border rounded"
                    placeholder="Original"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigPanel;