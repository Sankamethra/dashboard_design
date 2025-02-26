import { Paper, Box, Typography, TextField } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import { filterComponents, chartComponents } from '../config/componentConfig';

function DraggableItem({ id, type, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { type }
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
            <DraggableItem 
              key={component.id} 
              id={component.id}
              type={component.type}
            >
              {component.label}
            </DraggableItem>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>Chart Components</Typography>
        <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
          {chartComponents.map((component) => (
            <DraggableItem 
              key={component.id} 
              id={component.id}
              type={component.type}
            >
              {component.label}
            </DraggableItem>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export default RightSideArea;