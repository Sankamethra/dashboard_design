import { Box, Typography } from '@mui/material';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartComponent({ type, title, data, config }) {
  console.log('Chart render:', { type, title, data, config });

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={config.xAxisKey} 
                label={{ value: config.xAxisLabel, position: 'bottom' }}
                domain={config.xAxisDomain || ['auto', 'auto']}
              />
              <YAxis
                label={{ value: config.yAxisLabel, angle: -90, position: 'left' }}
                domain={config.yAxisDomain || ['auto', 'auto']}
              />
              <Tooltip />
              <Legend />
              {config.lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.key}
                  name={line.label}
                  stroke={line.color || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey={config.valueKey}
                nameKey={config.labelKey}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={config.xAxisKey}
                label={{ value: config.xAxisLabel, position: 'bottom' }}
              />
              <YAxis
                label={{ value: config.yAxisLabel, angle: -90, position: 'left' }}
              />
              <Tooltip />
              <Legend />
              {config.bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.key}
                  name={bar.label}
                  fill={bar.color || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey={config.valueKey}
                nameKey={config.labelKey}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={150}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom align="center">
        {title}
      </Typography>
      {data && data.length > 0 ? renderChart() : (
        <Typography color="text.secondary" align="center">
          No data available
        </Typography>
      )}
    </Box>
  );
}

export default ChartComponent; 