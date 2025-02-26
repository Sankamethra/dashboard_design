import { Box, Typography } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';

function ChartComponent({ type, xAxis, yAxis, title, chartKey }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Generate sample data based on x and y axis values
    const generateData = () => {
      if (!xAxis || !yAxis) return [];

      // Generate sample data points
      return Array.from({ length: 6 }, (_, i) => ({
        [xAxis]: i + 1,  // X-axis values (1,2,3,4,5,6)
        [yAxis]: Math.floor(Math.random() * (parseInt(yAxis) || 100))  // Y-axis values up to the specified y-axis value
      }));
    };

    setChartData(generateData());
  }, [xAxis, yAxis]);

  if (!chartData.length || !xAxis || !yAxis) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Please provide X-Axis and Y-Axis values
        </Typography>
      </Box>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxis}
                label={{ value: xAxis, position: 'bottom' }}
              />
              <YAxis 
                label={{ value: yAxis, angle: -90, position: 'left' }}
                domain={[0, parseInt(yAxis) || 'auto']}
              />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={yAxis}
                name={yAxis}
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxis}
                label={{ value: xAxis, position: 'bottom' }}
              />
              <YAxis 
                label={{ value: yAxis, angle: -90, position: 'left' }}
                domain={[0, parseInt(yAxis) || 'auto']}
              />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey={yAxis}
                name={yAxis}
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={yAxis}
                nameKey={xAxis}
                cx="50%"
                cy="50%"
                innerRadius={type === 'donut' ? 60 : 0}
                outerRadius={120}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="error">Invalid chart type</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ width: '100%', height: 400, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title || 'Chart Title'}
      </Typography>
      {renderChart()}
    </Box>
  );
}

export default ChartComponent; 