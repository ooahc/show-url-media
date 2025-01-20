export interface ChartData {
  labels: string[];
  values: number[];
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface URLParams {
  data?: ChartData;
  theme?: 'theme1' | 'theme2';
  hideDocs?: boolean;
}