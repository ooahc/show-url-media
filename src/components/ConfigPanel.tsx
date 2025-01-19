import React from 'react';
import { Settings } from 'lucide-react';
import type { MediaParams } from '../types';

interface ConfigPanelProps {
  params: MediaParams;
  onUpdate: (params: Partial<MediaParams>) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ params, onUpdate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [mediaType, setMediaType] = React.useState<'video' | 'image' | null>(null);
  const hoverTimeoutRef = React.useRef<number>();
  const panelTimeoutRef = React.useRef<number>();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 检查文件扩展名
    const hasVideoExt = /\.(mp4|webm|mov)$/i.test(params.url);
    const hasImageExt = /\.(jpg|jpeg|png|gif|webp)$/i.test(params.url);
    
    if (!hasVideoExt && !hasImageExt) {
      fetch(params.url, { method: 'HEAD' })
        .then(response => {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.startsWith('video/')) {
            setMediaType('video');
          } else if (contentType.startsWith('image/')) {
            setMediaType('image');
          }
        })
        .catch(() => {
          // 如果请求失败，尝试使用扩展名判断
          setMediaType(hasVideoExt ? 'video' : 'image');
        });
    } else {
      setMediaType(hasVideoExt ? 'video' : 'image');
    }
  }, [params.url]);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    clearTimeout(panelTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 1000);

    panelTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(panelTimeoutRef.current);
    };
  }, []);

  const updateParams = (update: Partial<MediaParams>) => {
    onUpdate({ ...params, ...update });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 bg-white rounded-full shadow-lg transition-all duration-300 
          ${isHovered ? 'opacity-100 hover:bg-gray-100 active:bg-gray-200 transform active:scale-95' : 'opacity-5'}
          hover:ring-2 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
      >
        <Settings className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full right-0 mb-2 p-4 bg-white rounded-lg shadow-lg w-64
            transform transition-all duration-300 origin-bottom-right
            animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Display Mode
              </label>
              <select
                value={params.mode}
                onChange={(e) => updateParams({ mode: e.target.value as any })}
                className="w-full p-2 border rounded"
              >
                <option value="fit">Fit</option>
                <option value="fill">Fill</option>
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
      )}
    </div>
  );
};

export default ConfigPanel;