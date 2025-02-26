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
      gap: 3,
      height: '100%',
      overflow: 'auto',
      p: 3,
      bgcolor: '#f5f7fa'
    }}>
      {error && (
        <Alert severity="error" sx={{ borderRadius: 2, boxShadow: 1 }}>
          {error}
        </Alert>
      )}

      {/* Filter Drop Area */}
      <Paper sx={{ 
        p: 3,
        borderRadius: 2,
        bgcolor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', fontWeight: 600 }}>
          Filters
        </Typography>
        <Box
          ref={setFilterRef}
          sx={{
            minHeight: 100,
            p: 2,
            border: '2px dashed',
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            bgcolor: '#fafafa',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          {currentDashboard.filters.map((filter) => (
            <Paper 
              key={filter.id}
              sx={{ 
                width: 'calc(33.33% - 16px)',
                p: 2,
                position: 'relative',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s'
              }}
            >
              <IconButton
                size="small"
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'grey.500',
                  '&:hover': {
                    color: 'error.main',
                    bgcolor: 'error.light'
                  }
                }}
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
            <Typography 
              color="text.secondary" 
              align="center" 
              sx={{ 
                width: '100%',
                py: 4
              }}
            >
              Drag and drop filters here
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Chart Drop Area */}
      <Paper sx={{ 
        p: 3,
        borderRadius: 2,
        bgcolor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', fontWeight: 600 }}>
          Charts
        </Typography>
        <Box
          ref={setChartRef}
          sx={{
            minHeight: 100,
            p: 2,
            border: '2px dashed',
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            bgcolor: '#fafafa',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
        >
          {currentDashboard.charts.map((chart) => (
            <Paper 
              key={chart.id}
              sx={{ 
                width: 'calc(50% - 16px)',
                p: 2,
                position: 'relative',
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s'
              }}
            >
              <IconButton
                size="small"
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'grey.500',
                  '&:hover': {
                    color: 'error.main',
                    bgcolor: 'error.light'
                  }
                }}
                onClick={() => handleRemoveChart(chart.id)}
              >
                <DeleteIcon />
              </IconButton>
              <ChartInput
                type={chart.type}
                value={chart}
                onChange={(updates) => handleChartChange(chart.id, updates)}
              />
              <Box sx={{ mt: 3 }}>
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
            <Typography 
              color="text.secondary" 
              align="center"
              sx={{ 
                width: '100%',
                py: 4
              }}
            >
              Drag and drop charts here
            </Typography>
          )}
        </Box>
      </Paper>

      <Button 
        variant="contained" 
        onClick={onSave}
        sx={{ 
          alignSelf: 'flex-start',
          px: 4,
          py: 1.5,
          borderRadius: 2,
          bgcolor: '#1a237e',
          '&:hover': {
            bgcolor: '#0d47a1'
          }
        }}
      >
        Save Dashboard
      </Button>
    </Box>
  );
}

export default MiddleArea;