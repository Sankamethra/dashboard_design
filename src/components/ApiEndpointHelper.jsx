import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getSampleEndpoints } from '../services/api';

function ApiEndpointHelper() {
  const endpoints = getSampleEndpoints();

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Sample API Endpoints:
      </Typography>
      <List dense>
        {endpoints.map((endpoint) => (
          <ListItem
            key={endpoint.url}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleCopy(endpoint.url)}>
                <ContentCopyIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={endpoint.name}
              secondary={endpoint.url}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ApiEndpointHelper; 