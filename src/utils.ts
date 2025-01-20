import { ChartData, URLParams } from './types';

export const parseURLParams = (): URLParams => {
  const params = new URLSearchParams(window.location.search);
  
  let data: ChartData | undefined;
  try {
    const dataParam = params.get('data');
    if (dataParam) {
      data = JSON.parse(decodeURIComponent(dataParam));
    }
  } catch (e) {
    console.error('Failed to parse data parameter:', e);
  }

  return {
    data,
    theme: (params.get('theme') as 'theme1' | 'theme2') || 'theme1',
    hideDocs: params.get('hideDocs') === 'true'
  };
};