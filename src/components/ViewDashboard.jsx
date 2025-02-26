import { Box, Paper, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChartComponent from './ChartComponent';
import DynamicForm from './DynamicForm';
import { useState, useEffect } from 'react';

function ViewDashboard({ dashboard, onEdit }) {
  const [filterValues, setFilterValues] = useState(dashboard.filters);
  const [chartData, setChartData] = useState(dashboard.charts);

  useEffect(() => {
    setFilterValues(dashboard.filters);
    setChartData(dashboard.charts);
  }, [dashboard]);

  const handleFilterChange = (filterId, value) => {
    setFilterValues(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, value } 
        : filter
    ));
    
    // Log the updated filters to help debug
    console.log('Updated Filters:', filterValues);
  };

  // Log the initial data to help debug
  useEffect(() => {
    console.log('Dashboard Data:', dashboard);
    console.log('Filter Values:', filterValues);
    console.log('Chart Data:', chartData);
  }, [dashboard, filterValues, chartData]);

  return (
    <Box sx={{ 
      flex: 1, 
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 3,
      overflow: 'auto',
      bgcolor: '#f5f7fa'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
          {dashboard.title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onEdit}
          sx={{
            borderRadius: 2,
            color: '#1a237e',
            borderColor: '#1a237e',
            '&:hover': {
              borderColor: '#0d47a1',
              bgcolor: 'rgba(13, 71, 161, 0.04)'
            }
          }}
        >
          Edit Dashboard
        </Button>
      </Box>

      {filterValues.length > 0 && (
        <Paper sx={{ 
          p: 3,
          borderRadius: 2,
          bgcolor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1a237e', fontWeight: 600 }}>
            Filters
          </Typography>
          <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2
          }}>
            {filterValues.map((filter) => (
              <Box 
                key={filter.id}
                sx={{ 
                  width: 'calc(33.33% - 16px)',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#f8f9fa',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <DynamicForm
                  filter={filter}
                  onFilterChange={(value) => handleFilterChange(filter.id, value)}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2
      }}>
        {chartData.map((chart) => (
          <Paper 
            key={chart.id}
            sx={{ 
              width: 'calc(50% - 16px)',
              p: 3,
              borderRadius: 2,
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s'
            }}
          >
            <ChartComponent
              type={chart.type}
              title={chart.title}
              data={chart.data}
              config={chart.config}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default ViewDashboard; 