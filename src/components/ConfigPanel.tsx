import React from 'react';
import { Settings, X } from 'lucide-react';
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
    if (window.innerWidth > 768) { // 仅在桌面端启用hover效果
      clearTimeout(hoverTimeoutRef.current);
      clearTimeout(panelTimeoutRef.current);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) { // 仅在桌面端启用自动隐藏
      hoverTimeoutRef.current = window.setTimeout(() => {
        setIsHovered(false);
      }, 1000);

      panelTimeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
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

  const handleDialogClick = (e: React.MouseEvent) => {
    // 阻止事件冒泡到背景层
    e.stopPropagation();
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const ConfigForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2 text-white">
          Display Mode
        </label>
        <select
          value={params.mode}
          onChange={(e) => updateParams({ mode: e.target.value as any })}
          className="w-full p-2.5 rounded-lg bg-black/40 border border-white/30 
            backdrop-blur-sm text-white placeholder-white/70
            focus:outline-none focus:ring-2 focus:ring-white/50
            transition-all duration-200"
        >
          <option value="fit">Fit</option>
          <option value="fill">Fill</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-white" htmlFor="width-input">
          Width (pixels)
        </label>
        <input
          id="width-input"
          type="number"
          value={params.width || ''}
          onChange={(e) => updateParams({ width: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full p-2.5 rounded-lg bg-black/40 border border-white/30 
            backdrop-blur-sm text-white placeholder-white/70
            focus:outline-none focus:ring-2 focus:ring-white/50
            transition-all duration-200"
          placeholder="Auto"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-white" htmlFor="height-input">
          Height (pixels)
        </label>
        <input
          id="height-input"
          type="number"
          value={params.height || ''}
          onChange={(e) => updateParams({ height: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full p-2.5 rounded-lg bg-black/40 border border-white/30 
            backdrop-blur-sm text-white placeholder-white/70
            focus:outline-none focus:ring-2 focus:ring-white/50
            transition-all duration-200"
          placeholder="Auto"
        />
      </div>

      {mediaType === 'image' && (
        <div>
          <label className="block text-sm font-semibold mb-2 text-white" htmlFor="quality-input">
            Quality (1-100)
          </label>
          <input
            id="quality-input"
            type="number"
            min="1"
            max="100"
            value={params.quality || ''}
            onChange={(e) => updateParams({ quality: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full p-2.5 rounded-lg bg-black/40 border border-white/30 
              backdrop-blur-sm text-white placeholder-white/70
              focus:outline-none focus:ring-2 focus:ring-white/50
              transition-all duration-200"
            placeholder="Original"
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 移动端对话框 */}
      {isOpen && window.innerWidth <= 768 && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div 
            className="w-full max-w-sm rounded-2xl overflow-hidden 
              bg-black/40 backdrop-blur-md
              border border-white/30 shadow-lg"
            onClick={handleDialogClick}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/30 bg-black/20">
              <h3 className="text-lg font-semibold text-white">Display Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200"
                aria-label="Close settings"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <ConfigForm />
            </div>
          </div>
        </div>
      )}

      {/* 桌面端面板 */}
      <div 
        ref={containerRef}
        className="fixed bottom-4 right-4 z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open settings"
          className={`p-2.5 rounded-full transition-all duration-300 
            bg-black/40 backdrop-blur-md
            border border-white/30 shadow-lg
            ${isHovered ? 'opacity-100' : 'opacity-20'}
            hover:scale-105 active:scale-95
            hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50`}
        >
          <Settings className={`w-6 h-6 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && window.innerWidth > 768 && (
          <div 
            className="absolute bottom-full right-0 mb-3 p-6 w-72
              rounded-2xl bg-black/40 
              backdrop-blur-md border border-white/30 shadow-lg
              transform transition-all duration-300 origin-bottom-right
              animate-in fade-in slide-in-from-bottom-2"
            role="dialog"
            aria-label="Display settings"
          >
            <ConfigForm />
          </div>
        )}
      </div>
    </>
  );
};

export default ConfigPanel;