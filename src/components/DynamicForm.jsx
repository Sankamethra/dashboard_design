import { Box, TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function DynamicForm({ filters, onFilterChange }) {
  const renderField = (filter) => {
    // Common label for all filters
    const labelElement = (
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
        {filter.label}
      </Typography>
    );

    switch (filter.key) {
      case 'input':
        return (
          <Box>
            {labelElement}
            <TextField
              fullWidth
              placeholder={filter.config?.placeholder}
              value={filter.value || ''}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
              size="small"
            />
          </Box>
        );

      case 'select':
        return (
          <Box>
            {labelElement}
            <FormControl fullWidth size="small">
              <Select
                value={filter.value || ''}
                onChange={(e) => onFilterChange(filter.id, e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <em>Choose {filter.label}</em>
                </MenuItem>
                {filter.config?.options?.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 'radio':
        return (
          <Box>
            {labelElement}
            <RadioGroup
              value={filter.value || ''}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
              row
            >
              {filter.config?.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
        );

      case 'dateRange':
        return (
          <Box>
            {labelElement}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={filter.value?.start || null}
                onChange={(date) => onFilterChange(filter.id, { ...filter.value, start: date })}
                slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
              />
              <DatePicker
                label="End Date"
                value={filter.value?.end || null}
                onChange={(date) => onFilterChange(filter.id, { ...filter.value, end: date })}
                slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
              />
            </Box>
          </Box>
        );

      case 'switch':
        return (
          <Box>
            {labelElement}
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(filter.value)}
                  onChange={(e) => onFilterChange(filter.id, e.target.checked)}
                />
              }
              label={filter.value ? "Enabled" : "Disabled"}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {filters.map((filter) => (
        <Box 
          key={filter.id} 
          sx={{ 
            p: 2, 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 1,
            bgcolor: 'background.paper'
          }}
        >
          {renderField(filter)}
        </Box>
      ))}
    </Box>
  );
}

export default DynamicForm; 