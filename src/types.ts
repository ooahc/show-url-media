export type DisplayMode = 'fit' | 'fill' | 'stretch';

export interface MediaParams {
  url: string;
  mode: DisplayMode;
  width?: number;
  height?: number;
  quality?: number;
}

export interface MediaDisplayProps {
  params: MediaParams;
}