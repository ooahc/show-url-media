import React from 'react';
import { RadarChart } from './components/RadarChart';
import { BarChart } from './components/BarChart';
import { Documentation } from './components/Documentation';
import { parseURLParams } from './utils';
import { themes } from './themes';

const defaultData = {
  labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
  values: [85, 65, 75, 90, 70],
};

function App() {
  const { data = defaultData, theme: themeKey = 'theme1', hideDocs = false } = parseURLParams();
  const theme = themes[themeKey];

  return (
    <div 
      className="min-h-screen p-6"
      style={{ 
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">数据可视化面板</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">数据分布</h2>
            <RadarChart data={data} theme={theme} />
          </div>
          
          <div className="bg-white/10 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">数据对比</h2>
            <BarChart data={data} theme={theme} />
          </div>
        </div>

        {!hideDocs && <Documentation />}
      </div>
    </div>
  );
}

export default App;