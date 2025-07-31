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
import { TrendingUp, AlertTriangle, Droplets, Activity, Zap, Clock } from 'lucide-react';

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
  const [liveIndicators, setLiveIndicators] = useState({
    currentLevel: 0,
    trend: 'rising',
    riskLevel: 'moderate',
    lastUpdate: new Date()
  });

  useEffect(() => {
    // Generate dynamic data with more realistic patterns
    const generateTimeSeriesData = () => {
      const labels = [];
      const actual = [];
      const predicted = [];
      const baseLevel = 15;
      
      for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
        // More realistic water level patterns with seasonal variations
        const timeFactor = Math.sin(i * 0.3) * 2;
        const randomFactor = Math.random() * 1.5;
        const actualValue = baseLevel + timeFactor + randomFactor;
        const predictedValue = baseLevel + timeFactor + randomFactor * 0.8;
        
        actual.push(actualValue);
        predicted.push(predictedValue);
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
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
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
            borderDash: [8, 4],
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgb(239, 68, 68)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Actual Level',
            data: actual,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgb(34, 197, 94)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      });

      // Update live indicators
      const currentLevel = actual[actual.length - 1];
      const previousLevel = actual[actual.length - 2] || currentLevel;
      setLiveIndicators({
        currentLevel: currentLevel,
        trend: currentLevel > previousLevel ? 'rising' : 'falling',
        riskLevel: currentLevel > 18 ? 'high' : currentLevel > 16 ? 'moderate' : 'low',
        lastUpdate: new Date()
      });
    };

    const generateRainfallData = () => {
      const locations = ['Kanpur', 'Allahabad', 'Varanasi', 'Patna', 'Haridwar'];
      const rainfallValues = locations.map(() => Math.random() * 50 + 10);
      
      setRainfallData({
        labels: locations,
        datasets: [
          {
            label: 'Rainfall (mm)',
            data: rainfallValues,
            backgroundColor: [
              'rgba(59, 130, 246, 0.9)',
              'rgba(16, 185, 129, 0.9)',
              'rgba(245, 158, 11, 0.9)',
              'rgba(239, 68, 68, 0.9)',
              'rgba(139, 92, 246, 0.9)'
            ],
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
            hoverBackgroundColor: [
              'rgba(59, 130, 246, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(245, 158, 11, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(139, 92, 246, 1)'
            ]
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
            backgroundColor: 'rgba(59, 130, 246, 0.9)',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Discharge',
            data: months.map(() => Math.random() * 40 + 15),
            backgroundColor: 'rgba(16, 185, 129, 0.9)',
            borderRadius: 6,
            borderSkipped: false
          },
          {
            label: 'Water Level',
            data: months.map(() => Math.random() * 25 + 5),
            backgroundColor: 'rgba(245, 158, 11, 0.9)',
            borderRadius: 6,
            borderSkipped: false
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
              'rgba(59, 130, 246, 0.9)',
              'rgba(16, 185, 129, 0.9)',
              'rgba(245, 158, 11, 0.9)',
              'rgba(239, 68, 68, 0.9)',
              'rgba(139, 92, 246, 0.9)'
            ],
            borderWidth: 2,
            borderColor: '#fff',
            hoverBorderWidth: 3
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
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: 'rgb(239, 68, 68)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      });
    };

    generateTimeSeriesData();
    generateRainfallData();
    generateStackedData();
    generateFloodCausesData();
    generateTrendData();

    // Update data every 15 seconds for more live feel
    const interval = setInterval(() => {
      generateTimeSeriesData();
      generateRainfallData();
      generateStackedData();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Water Level (meters)',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Time (24-hour format)',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Rainfall (mm)',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Location',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  const stackedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Value (units)',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        },
        stacked: true
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Month',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        },
        stacked: true
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Number of Flood Events',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.08)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          }
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 12,
            weight: 'bold' as const
          },
          color: '#374151'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div id="charts" className="space-y-8">
      {/* Live Status Header */}
      <div className="glass-effect-dark rounded-2xl p-6 text-white shadow-2xl border border-white/20 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="data-flow h-full w-full"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px scan-line"></div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Activity className="h-8 w-8 animate-pulse text-cyan-400" />
              <div className="absolute inset-0 animate-glow">
                <Activity className="h-8 w-8 text-cyan-300 opacity-50" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Real-Time Dashboard</h2>
              <p className="text-gray-300">Live monitoring data from LiDAR sensors and AI prediction models</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass-effect px-3 py-2 rounded-lg border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Last Update</div>
              <div className="text-sm font-medium">{liveIndicators.lastUpdate.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
        
        {/* Live Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-effect rounded-lg p-4 border border-white/20 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm">Current Level</div>
                <div className="text-2xl font-bold">{liveIndicators.currentLevel.toFixed(1)}m</div>
              </div>
              <Droplets className="h-8 w-8 text-cyan-400 animate-pulse-slow" />
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-4 border border-white/20 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm">Trend</div>
                <div className="text-2xl font-bold capitalize">{liveIndicators.trend}</div>
              </div>
              <TrendingUp className={`h-8 w-8 animate-float ${liveIndicators.trend === 'rising' ? 'text-red-400' : 'text-green-400'}`} />
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-4 border border-white/20 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm">Risk Level</div>
                <div className="text-2xl font-bold capitalize">{liveIndicators.riskLevel}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400 animate-pulse-slow" />
            </div>
          </div>
          
          <div className="glass-effect rounded-lg p-4 border border-white/20 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-300 text-sm">Status</div>
                <div className="text-2xl font-bold">Active</div>
              </div>
              <Zap className="h-8 w-8 text-green-400 animate-glow" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* River Level vs Time */}
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">River Level vs Time</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Live</span>
            </div>
          </div>
          <div className="h-64">
            {riverLevelData && <Line data={riverLevelData} options={chartOptions} />}
          </div>
        </div>

        {/* Rainfall by Location */}
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Rainfall by Location</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Live</span>
            </div>
          </div>
          <div className="h-64">
            {rainfallData && <Bar data={rainfallData} options={barChartOptions} />}
          </div>
        </div>

        {/* AI Prediction vs Actual */}
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">AI Model Prediction vs Actual Level</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">AI</span>
            </div>
          </div>
          <div className="h-64">
            {predictionData && <Line data={predictionData} options={chartOptions} />}
          </div>
        </div>

        {/* Stacked Bar Chart */}
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Rainfall + Discharge + Water Level</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Live</span>
            </div>
          </div>
          <div className="h-64">
            {stackedData && <Bar data={stackedData} options={stackedBarOptions} />}
          </div>
        </div>

        {/* Flood Causes Pie Chart */}
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Cause of Flood Events</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Analysis</span>
            </div>
          </div>
          <div className="h-64">
            {floodCausesData && <Pie data={floodCausesData} options={pieOptions} />}
          </div>
        </div>

        {/* Year-wise Flood Frequency */}
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20 hover-lift card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Year-wise Flood Frequency</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Trend</span>
            </div>
          </div>
          <div className="h-64">
            {trendData && <Line data={trendData} options={trendChartOptions} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;