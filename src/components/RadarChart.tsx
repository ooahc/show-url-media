import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ChartData, Theme } from '../types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  data: ChartData;
  theme: Theme;
}

export const RadarChart = ({ data, theme }: RadarChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Distribution',
        data: data.values,
        backgroundColor: `${theme.primary}40`,
        borderColor: theme.primary,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        grid: {
          color: `${theme.text}20`,
        },
        angleLines: {
          color: `${theme.text}20`,
        },
        ticks: {
          color: theme.text,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.text,
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <Radar data={chartData} options={options} />
    </div>
  );
};