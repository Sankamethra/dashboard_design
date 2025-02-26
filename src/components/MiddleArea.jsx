import { Box, Paper, TextField, Button, IconButton, Typography, Alert } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterInput from './FilterInput';
import ChartComponent from './ChartComponent';

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

  const handleRemoveFilter = (filterId) => {
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
            bgcolor: 'background.default',
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 1
          }}
        >
          {currentDashboard.filters.map((filter) => (
            <Paper
              key={filter.id}
              elevation={1}
              sx={{ mb: 2, p: 2, position: 'relative' }}
            >
              <IconButton
                size="small"
                onClick={() => handleRemoveFilter(filter.id)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              <FilterInput
                type={filter.type}
                value={filter.value}
                label={filter.label}
                onLabelChange={(label) => handleFilterChange(filter.id, { label })}
                onKeyChange={(key) => handleFilterChange(filter.id, { key })}
                onChange={(value) => handleFilterChange(filter.id, { value })}
              />
            </Paper>
          ))}
        </Box>
      </Paper>

      {/* Chart Drop Area */}
      <Paper sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6" gutterBottom>Charts</Typography>
        <Box
          ref={setChartRef}
          sx={{
            minHeight: 100,
            p: 2,
            bgcolor: 'background.default',
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 1
          }}
        >
          {currentDashboard.charts.map((chart) => (
            <Paper
              key={chart.id}
              elevation={1}
              sx={{ mb: 2, p: 2, position: 'relative' }}
            >
              <IconButton
                size="small"
                onClick={() => handleRemoveChart(chart.id)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <DeleteIcon />
              </IconButton>
              <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  size="small"
                  label="Title"
                  value={chart.title}
                  onChange={(e) => handleChartChange(chart.id, { title: e.target.value })}
                />
                <TextField
                  size="small"
                  label="Key"
                  value={chart.key}
                  onChange={(e) => handleChartChange(chart.id, { key: e.target.value })}
                />
                <TextField
                  size="small"
                  label="X Axis"
                  value={chart.xAxis}
                  onChange={(e) => handleChartChange(chart.id, { xAxis: e.target.value })}
                />
                <TextField
                  size="small"
                  label="Y Axis"
                  value={chart.yAxis}
                  onChange={(e) => handleChartChange(chart.id, { yAxis: e.target.value })}
                />
              </Box>
              <ChartComponent
                type={chart.type}
                title={chart.title}
                chartKey={chart.key}
                xAxis={chart.xAxis}
                yAxis={chart.yAxis}
              />
            </Paper>
          ))}
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