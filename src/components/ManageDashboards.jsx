import { Box, Paper, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

function ManageDashboards({ dashboards, onEdit, onDelete, onView, onNew }) {
  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Manage Dashboards</Typography>
        <IconButton color="primary" onClick={onNew}>
          <AddIcon />
        </IconButton>
      </Box>
      
      <Paper>
        <List>
          {dashboards.map((dashboard) => (
            <ListItem
              key={dashboard.id}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => onView(dashboard)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onEdit(dashboard)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDelete(dashboard.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText 
                primary={dashboard.title}
                secondary={`API Endpoint: ${dashboard.apiUrl}`}
              />
            </ListItem>
          ))}
          {dashboards.length === 0 && (
            <ListItem>
              <ListItemText primary="No dashboards created yet" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default ManageDashboards; 