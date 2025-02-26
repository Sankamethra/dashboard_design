import { Box, TextField, Select, MenuItem, Switch, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function DynamicForm({ filter, onFilterChange }) {
  const renderFilter = () => {
    switch (filter.type) {
      case 'input':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {filter.label}
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={filter.value || ''}
              onChange={(e) => onFilterChange(e.target.value)}
              placeholder={`Enter ${filter.label}`}
              sx={{
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            />
          </Box>
        );

      case 'select':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {filter.label}
            </Typography>
            <Select
              fullWidth
              size="small"
              value={filter.value || ''}
              onChange={(e) => onFilterChange(e.target.value)}
              sx={{
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
            >
              {filter.config?.options?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>
        );

      case 'radio':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {filter.label}
            </Typography>
            <RadioGroup
              value={filter.value || ''}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              {filter.config?.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio size="small" />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
        );

      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(filter.value)}
                onChange={(e) => onFilterChange(e.target.checked)}
                size="small"
              />
            }
            label={filter.label}
          />
        );

      case 'dateRange':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              {filter.label}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={filter.value?.start || null}
                onChange={(date) => onFilterChange({ ...filter.value, start: date })}
                slotProps={{ 
                  textField: { 
                    size: 'small',
                    sx: { 
                      bgcolor: 'white',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1
                      }
                    }
                  }
                }}
              />
              <DatePicker
                label="End Date"
                value={filter.value?.end || null}
                onChange={(date) => onFilterChange({ ...filter.value, end: date })}
                slotProps={{ 
                  textField: { 
                    size: 'small',
                    sx: { 
                      bgcolor: 'white',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1
                      }
                    }
                  }
                }}
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      p: 2,
      borderRadius: 1,
      '& .MuiTypography-subtitle2': {
        color: '#1a237e',
        fontWeight: 500,
        mb: 1
      }
    }}>
      {renderFilter()}
    </Box>
  );
}

export default DynamicForm; 