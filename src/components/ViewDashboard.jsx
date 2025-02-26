import { Box, Paper, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FilterInput from './FilterInput';
import ChartComponent from './ChartComponent';

function ViewDashboard({ dashboard, onEdit }) {
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
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {dashboard.filters.map((filter) => (
              <Box key={filter.id} sx={{ minWidth: 200 }}>
                <Typography variant="subtitle2">{filter.label}</Typography>
                <FilterInput
                  type={filter.type}
                  value={filter.value}
                  label={filter.label}
                  onChange={() => {}}
                  disabled
                />
              </Box>
            ))}
          </Box>
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