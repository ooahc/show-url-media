import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData, Theme } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: ChartData;
  theme: Theme;
}

export const BarChart = ({ data, theme }: BarChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Comparison',
        data: data.values,
        backgroundColor: theme.secondary,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        grid: {
          color: `${theme.text}20`,
        },
        ticks: {
          color: theme.text,
        },
      },
      y: {
        grid: {
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
      <Bar data={chartData} options={options} />
    </div>
  );
};