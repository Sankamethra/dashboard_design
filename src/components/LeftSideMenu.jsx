import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function LeftSideMenu({ selectedTab, setSelectedTab, dashboards, onNewDashboard, onViewDashboard, onImport }) {
  return (
    <Box sx={{ 
      width: 260,
      bgcolor: '#fff',
      borderRight: '1px solid',
      borderColor: 'divider',
      p: 2
    }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={onNewDashboard}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#1976d2' }}>
              <AddIcon />
            </ListItemIcon>
            <ListItemText 
              primary="New Dashboard"
              primaryTypographyProps={{ 
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={onImport}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#1976d2' }}>
              <CloudDownloadIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Import Dashboard"
              primaryTypographyProps={{ 
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => setSelectedTab(1)}
            selected={selectedTab === 1}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: '#e3f2fd',
                color: '#1976d2',
                '&:hover': { bgcolor: '#bbdefb' }
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Manage Dashboards"
              primaryTypographyProps={{ 
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 2 }} />

        {/* Saved Dashboards */}
        {dashboards.map((dashboard) => (
          <ListItem key={dashboard.id} disablePadding>
            <ListItemButton
              onClick={() => onViewDashboard(dashboard)}
              selected={selectedTab === dashboard.id}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&.Mui-selected': {
                  bgcolor: '#e3f2fd',
                  color: '#1976d2',
                  '&:hover': { bgcolor: '#bbdefb' }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText 
                primary={dashboard.title}
                primaryTypographyProps={{ 
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default LeftSideMenu;