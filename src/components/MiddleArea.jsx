import { Box, Paper, TextField, Button, IconButton, Typography, Alert } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterInput from './FilterInput';
import ChartComponent from './ChartComponent';
import ChartInput from './ChartInput';

function MiddleArea({ currentDashboard, setCurrentDashboard, onSave, error }) {
  const { setNodeRef: setFilterRef } = useDroppable({
    id: 'filterDestination'
  });

  const { setNodeRef: setChartRef } = useDroppable({
    id: 'chartDestination'
  });

  const handleFilterChange = (filterId, updates) => {
    setCurrentDashboard(prev => ({
      ...prev,
      filters: prev.filters.map(filter => 
        filter.id === filterId ? { ...filter, ...updates } : filter
      )
    }));
  };

  const handleChartChange = (chartId, updates) => {
    setCurrentDashboard(prev => ({
      ...prev,
      charts: prev.charts.map(chart => 
        chart.id === chartId ? { ...chart, ...updates } : chart
      )
    }));
  };

  const handleFilterDelete = (filterId) => {
    setCurrentDashboard(prev => ({
      ...prev,
      filters: prev.filters.filter(f => f.id !== filterId)
    }));
  };

  const handleRemoveChart = (chartId) => {
    setCurrentDashboard(prev => ({
      ...prev,
      charts: prev.charts.filter(c => c.id !== chartId)
    }));
  };

  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      height: '100%',
      overflow: 'auto',
      p: 2
    }}>
      {error && <Alert severity="error">{error}</Alert>}
      
      {/* Filter Drop Area */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        <Box
          ref={setFilterRef}
          sx={{
            minHeight: 100,
            p: 2,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {currentDashboard.filters.map((filter) => (
            <Paper key={filter.id} sx={{ p: 2, position: 'relative' }}>
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleFilterDelete(filter.id)}
              >
                <DeleteIcon />
              </IconButton>
              <FilterInput
                type={filter.type}
                value={filter}
                onChange={(updates) => handleFilterChange(filter.id, updates)}
                label={filter.label}
                onLabelChange={(newLabel) => handleFilterChange(filter.id, { label: newLabel })}
                onKeyChange={(newKey) => handleFilterChange(filter.id, { key: newKey })}
              />
            </Paper>
          ))}
          {currentDashboard.filters.length === 0 && (
            <Typography color="text.secondary" align="center">
              Drag and drop filters here
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Chart Drop Area */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Charts</Typography>
        <Box
          ref={setChartRef}
          sx={{
            minHeight: 100,
            p: 2,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {currentDashboard.charts.map((chart) => (
            <Paper key={chart.id} sx={{ p: 2, position: 'relative' }}>
              <IconButton
                size="small"
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveChart(chart.id)}
              >
                <DeleteIcon />
              </IconButton>
              <ChartInput
                type={chart.type}
                value={chart}
                onChange={(updates) => handleChartChange(chart.id, updates)}
              />
              <Box sx={{ mt: 2 }}>
                <ChartComponent
                  type={chart.type}
                  title={chart.title}
                  data={chart.data}
                  config={chart.config}
                />
              </Box>
            </Paper>
          ))}
          {currentDashboard.charts.length === 0 && (
            <Typography color="text.secondary" align="center">
              Drag and drop charts here
            </Typography>
          )}
        </Box>
      </Paper>

      <Button 
        variant="contained" 
        onClick={onSave}
        sx={{ alignSelf: 'flex-start' }}
      >
        Save Dashboard
      </Button>
    </Box>
  );
}

export default MiddleArea;