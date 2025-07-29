import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardCharts: React.FC = () => {
  const [riverLevelData, setRiverLevelData] = useState<any>(null);
  const [rainfallData, setRainfallData] = useState<any>(null);
  const [predictionData, setPredictionData] = useState<any>(null);
  const [stackedData, setStackedData] = useState<any>(null);
  const [floodCausesData, setFloodCausesData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any>(null);

  useEffect(() => {
    // Generate dynamic data
    const generateTimeSeriesData = () => {
      const labels = [];
      const actual = [];
      const predicted = [];
      
      for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
        actual.push(15 + Math.sin(i * 0.5) * 3 + Math.random() * 2);
        predicted.push(15 + Math.sin(i * 0.5) * 3 + Math.random() * 1.5);
      }
      
      setRiverLevelData({
        labels,
        datasets: [
          {
            label: 'Current Water Level (m)',
            data: actual,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      });

      setPredictionData({
        labels,
        datasets: [
          {
            label: 'AI Prediction',
            data: predicted,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderDash: [5, 5],
            tension: 0.4
          },
          {
            label: 'Actual Level',
            data: actual,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4
          }
        ]
      });
    };

    const generateRainfallData = () => {
      const locations = ['Kanpur', 'Allahabad', 'Varanasi', 'Patna', 'Haridwar'];
      setRainfallData({
        labels: locations,
        datasets: [
          {
            label: 'Rainfall (mm)',
            data: locations.map(() => Math.random() * 50 + 10),
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)'
            ],
            borderWidth: 0,
            borderRadius: 4
          }
        ]
      });
    };

    const generateStackedData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      setStackedData({
        labels: months,
        datasets: [
          {
            label: 'Rainfall',
            data: months.map(() => Math.random() * 30 + 10),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 4
          },
          {
            label: 'Discharge',
            data: months.map(() => Math.random() * 40 + 15),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 4
          },
          {
            label: 'Water Level',
            data: months.map(() => Math.random() * 25 + 5),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderRadius: 4
          }
        ]
      });
    };

    const generateFloodCausesData = () => {
      setFloodCausesData({
        labels: ['Heavy Rainfall', 'Dam Release', 'Monsoon', 'Glacier Melt', 'Urban Runoff'],
        datasets: [
          {
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)'
            ],
            borderWidth: 0
          }
        ]
      });
    };

    const generateTrendData = () => {
      const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
      setTrendData({
        labels: years,
        datasets: [
          {
            label: 'Flood Events',
            data: [12, 8, 15, 11, 9, 14],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      });
    };

    generateTimeSeriesData();
    generateRainfallData();
    generateStackedData();
    generateFloodCausesData();
    generateTrendData();

    // Update data every 30 seconds
    const interval = setInterval(generateTimeSeriesData, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div id="charts" className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Dashboard</h2>
        <p className="text-gray-600">Live monitoring data from LiDAR sensors and AI prediction models</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* River Level vs Time */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">River Level vs Time</h3>
          <div className="h-64">
            {riverLevelData && <Line data={riverLevelData} options={chartOptions} />}
          </div>
        </div>

        {/* Rainfall by Location */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rainfall by Location</h3>
          <div className="h-64">
            {rainfallData && <Bar data={rainfallData} options={chartOptions} />}
          </div>
        </div>

        {/* AI Prediction vs Actual */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Prediction vs Actual Level</h3>
          <div className="h-64">
            {predictionData && <Line data={predictionData} options={chartOptions} />}
          </div>
        </div>

        {/* Stacked Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rainfall + Discharge + Water Level</h3>
          <div className="h-64">
            {stackedData && <Bar data={stackedData} options={{...chartOptions, scales: {...chartOptions.scales, x: {...chartOptions.scales.x, stacked: true}, y: {...chartOptions.scales.y, stacked: true}}}} />}
          </div>
        </div>

        {/* Flood Causes Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cause of Flood Events</h3>
          <div className="h-64">
            {floodCausesData && <Pie data={floodCausesData} options={pieOptions} />}
          </div>
        </div>

        {/* Year-wise Flood Frequency */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-wise Flood Frequency</h3>
          <div className="h-64">
            {trendData && <Line data={trendData} options={chartOptions} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;