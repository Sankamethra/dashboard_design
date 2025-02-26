import { Box, Paper, Typography, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChartComponent from './ChartComponent';
import DynamicForm from './DynamicForm';

function ViewDashboard({ dashboard, onEdit }) {
  const handleFilterChange = (key, value) => {
    // Handle filter value changes if needed
    console.log(`Filter ${key} changed to:`, value);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, p: 2, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{dashboard.title}</Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onEdit}
        >
          Edit Dashboard
        </Button>
      </Box>

      {dashboard.filters.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          <DynamicForm 
            filters={dashboard.filters}
            onFilterChange={handleFilterChange}
          />
        </Paper>
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