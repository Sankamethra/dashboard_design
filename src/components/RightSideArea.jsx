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
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        cursor: 'grab',
        userSelect: 'none',
        transition: 'all 0.2s',
        '&:hover': { 
          bgcolor: '#f5f5f5',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)'
        },
        '&:active': { 
          cursor: 'grabbing',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transform: 'translateY(0)'
        }
      }}
    >
      <Typography variant="body2" sx={{ color: '#424242' }}>
        {children}
      </Typography>
    </Box>
  );
}

function RightSideArea({ currentDashboard, setCurrentDashboard }) {
  return (
    <Paper sx={{ 
      width: 280, 
      p: 3, 
      height: '100%', 
      overflow: 'auto',
      bgcolor: '#fff',
      borderLeft: '1px solid',
      borderColor: 'divider'
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1a237e',
            fontWeight: 600,
            mb: 2
          }}
        >
          Dashboard Settings
        </Typography>
        <Box sx={{ 
          bgcolor: '#f8f9fa', 
          p: 2, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <TextField
            fullWidth
            size="small"
            label="Dashboard Title"
            value={currentDashboard.title}
            onChange={(e) => setCurrentDashboard(prev => ({ ...prev, title: e.target.value }))}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff'
              }
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1a237e',
            fontWeight: 600,
            mb: 2
          }}
        >
          Filter Components
        </Typography>
        <Box sx={{ 
          bgcolor: '#f8f9fa', 
          p: 2, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
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
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            color: '#1a237e',
            fontWeight: 600,
            mb: 2
          }}
        >
          Chart Components
        </Typography>
        <Box sx={{ 
          bgcolor: '#f8f9fa', 
          p: 2, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
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