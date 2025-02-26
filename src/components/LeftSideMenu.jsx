import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

function LeftSideMenu({ selectedTab, setSelectedTab, dashboards, onNewDashboard, onViewDashboard }) {
  return (
    <Box sx={{ width: 240, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={onNewDashboard}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="New Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setSelectedTab(1)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Dashboards" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {/* Saved Dashboards */}
        {dashboards.map((dashboard) => (
          <ListItem key={dashboard.id} disablePadding>
            <ListItemButton 
              onClick={() => onViewDashboard(dashboard)}
              selected={selectedTab === dashboard.id}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={dashboard.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LeftSideMenu;