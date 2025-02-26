import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useState } from 'react';

function ChartInput({ type, value, onChange }) {
  const [dataPoint, setDataPoint] = useState({ x: '', y: '' });
  const [piePoint, setPiePoint] = useState({ label: '', value: '' });

  const handleAddDataPoint = () => {
    if (dataPoint.x && dataPoint.y) {
      const newData = [...(value.data || []), { 
        [value.config.xAxisKey]: dataPoint.x,
        [value.config.lines[0].key]: parseFloat(dataPoint.y)
      }];
      onChange({ ...value, data: newData });
      setDataPoint({ x: '', y: '' });
    }
  };

  const handleAddPiePoint = () => {
    if (piePoint.label && piePoint.value) {
      const newData = [...(value.data || []), {
        [value.config.labelKey]: piePoint.label,
        [value.config.valueKey]: parseFloat(piePoint.value)
      }];
      onChange({ ...value, data: newData });
      setPiePoint({ label: '', value: '' });
    }
  };

  const renderLineChartInputs = () => (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="X-Axis Label"
          value={value.config?.xAxisLabel || ''}
          onChange={(e) => onChange({
            ...value,
            config: { ...value.config, xAxisLabel: e.target.value }
          })}
          size="small"
          fullWidth
        />
        <TextField
          label="Y-Axis Label"
          value={value.config?.yAxisLabel || ''}
          onChange={(e) => onChange({
            ...value,
            config: { ...value.config, yAxisLabel: e.target.value }
          })}
          size="small"
          fullWidth
        />
      </Box>

      <Typography variant="subtitle2" gutterBottom>Add Data Point</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="X Value"
          value={dataPoint.x}
          onChange={(e) => setDataPoint({ ...dataPoint, x: e.target.value })}
          size="small"
        />
        <TextField
          label="Y Value"
          type="number"
          value={dataPoint.y}
          onChange={(e) => setDataPoint({ ...dataPoint, y: e.target.value })}
          size="small"
        />
        <Button variant="outlined" onClick={handleAddDataPoint}>
          Add Point
        </Button>
      </Box>

      <Typography variant="subtitle2" gutterBottom>Current Data Points</Typography>
      {value.data?.map((point, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <Typography>
            X: {point[value.config.xAxisKey]}, Y: {point[value.config.lines[0].key]}
          </Typography>
          <Button 
            size="small" 
            color="error"
            onClick={() => {
              const newData = value.data.filter((_, i) => i !== index);
              onChange({ ...value, data: newData });
            }}
          >
            Remove
          </Button>
        </Box>
      ))}
    </Box>
  );

  const renderPieChartInputs = () => (
    <Box>
      <Typography variant="subtitle2" gutterBottom>Add Pie Segments</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="Label"
          value={piePoint.label}
          onChange={(e) => setPiePoint({ ...piePoint, label: e.target.value })}
          size="small"
        />
        <TextField
          label="Value"
          type="number"
          value={piePoint.value}
          onChange={(e) => setPiePoint({ ...piePoint, value: e.target.value })}
          size="small"
        />
        <Button variant="outlined" onClick={handleAddPiePoint}>
          Add Segment
        </Button>
      </Box>

      <Typography variant="subtitle2" gutterBottom>Current Segments</Typography>
      {value.data?.map((point, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <Typography>
            {point[value.config.labelKey]}: {point[value.config.valueKey]}%
          </Typography>
          <Button 
            size="small" 
            color="error"
            onClick={() => {
              const newData = value.data.filter((_, i) => i !== index);
              onChange({ ...value, data: newData });
            }}
          >
            Remove
          </Button>
        </Box>
      ))}
    </Box>
  );

  const renderBarChartInputs = () => (
    <Box>
      {renderLineChartInputs()}
    </Box>
  );

  const renderDonutChartInputs = () => (
    <Box>
      {renderPieChartInputs()}
    </Box>
  );

  const renderInputs = () => {
    switch (type) {
      case 'line':
        return renderLineChartInputs();
      case 'pie':
        return renderPieChartInputs();
      case 'bar':
        return renderBarChartInputs();
      case 'donut':
        return renderDonutChartInputs();
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Chart Title"
        value={value.title || ''}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
        size="small"
        sx={{ mb: 2 }}
      />
      {renderInputs()}
    </Paper>
  );
}

export default ChartInput; 