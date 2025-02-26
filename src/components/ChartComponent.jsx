import { Box, Typography } from '@mui/material';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CHART_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
];

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
                innerRadius={type === 'donut' ? 60 : 0}
                outerRadius={150}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
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

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      p: 3,
      borderRadius: 2,
      bgcolor: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      '& .recharts-wrapper': {
        mb: 2
      }
    }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        align="center"
        sx={{ 
          color: '#1a237e',
          fontWeight: 600,
          mb: 3
        }}
      >
        {title}
      </Typography>
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      ) : (
        <Typography 
          color="text.secondary" 
          align="center"
          sx={{ py: 8 }}
        >
          No data available
        </Typography>
      )}
    </Box>
  );
}

export default ChartComponent; 