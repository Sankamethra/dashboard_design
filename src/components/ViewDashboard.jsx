import { Box, Paper, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChartComponent from './ChartComponent';
import DynamicForm from './DynamicForm';
import { useState } from 'react';

function ViewDashboard({ dashboard, onEdit }) {
  const [filterValues, setFilterValues] = useState(dashboard.filters);

  const handleFilterChange = (filterId, value) => {
    setFilterValues(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, value } 
        : filter
    ));
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">{dashboard.title}</Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          Edit Dashboard
        </Button>
      </Box>

      {filterValues.length > 0 && (
        <DynamicForm 
          filters={filterValues}
          onFilterChange={handleFilterChange}
        />
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {dashboard.charts.map((chart) => (
          <Paper key={chart.id} sx={{ p: 2, width: '100%' }}>
            <ChartComponent
              type={chart.type}
              title={chart.title}
              xAxis={chart.xAxis}
              yAxis={chart.yAxis}
              chartKey={chart.key}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default ViewDashboard; 