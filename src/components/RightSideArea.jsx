import { Paper, Box, Typography, TextField } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        p: 2,
        mb: 1,
        bgcolor: 'white',
        borderRadius: 1,
        boxShadow: 1,
        cursor: 'grab',
        userSelect: 'none',
        '&:hover': { bgcolor: 'action.hover' },
        '&:active': { cursor: 'grabbing' }
      }}
    >
      {children}
    </Box>
  );
}

function RightSideArea({ currentDashboard, setCurrentDashboard }) {
  const filterComponents = [
    { id: 'filter-input', label: 'Input' },
    { id: 'filter-select', label: 'Select' },
    { id: 'filter-treeSelect', label: 'Tree Select' },
    { id: 'filter-radio', label: 'Radio' },
    { id: 'filter-numberInput', label: 'Number Input' },
    { id: 'filter-switch', label: 'Switch' },
    { id: 'filter-dateRange', label: 'Date Range Picker' }
  ];

  const chartComponents = [
    { id: 'chart-line', label: 'Line Chart' },
    { id: 'chart-pie', label: 'Pie Chart' },
    { id: 'chart-bar', label: 'Bar Chart' },
    { id: 'chart-donut', label: 'Donut Chart' }
  ];

  return (
    <Paper sx={{ width: 300, p: 2, height: '100%', overflow: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Dashboard Settings</Typography>
        <TextField
          fullWidth
          size="small"
          label="Dashboard Title"
          value={currentDashboard.title}
          onChange={(e) => setCurrentDashboard(prev => ({ ...prev, title: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          size="small"
          label="API Endpoint URL"
          value={currentDashboard.apiUrl}
          onChange={(e) => setCurrentDashboard(prev => ({ ...prev, apiUrl: e.target.value }))}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Filter Components</Typography>
        <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
          {filterComponents.map((component) => (
            <DraggableItem key={component.id} id={component.id}>
              {component.label}
            </DraggableItem>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Chart Components</Typography>
        <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
          {chartComponents.map((component) => (
            <DraggableItem key={component.id} id={component.id}>
              {component.label}
            </DraggableItem>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export default RightSideArea;