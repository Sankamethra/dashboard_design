import { Box, TextField, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function DynamicForm({ filters, onFilterChange }) {
  const renderField = (filter) => {
    switch (filter.key) {
      case 'input':
        return (
          <TextField
            fullWidth
            label={filter.label}
            value={filter.value || ''}
            onChange={(e) => onFilterChange(filter.id, e.target.value)}
            placeholder={filter.config?.placeholder}
            size="small"
          />
        );

      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={filter.value || ''}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
              label={filter.label}
            >
              {filter.config?.options?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl component="fieldset">
            <Typography variant="subtitle2">{filter.label}</Typography>
            <RadioGroup
              value={filter.value || ''}
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
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
          </FormControl>
        );

      case 'dateRange':
        return (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              label={`${filter.label} Start`}
              value={filter.value?.start || null}
              onChange={(date) => onFilterChange(filter.id, { ...filter.value, start: date })}
              slotProps={{ textField: { size: 'small' } }}
            />
            <DatePicker
              label={`${filter.label} End`}
              value={filter.value?.end || null}
              onChange={(date) => onFilterChange(filter.id, { ...filter.value, end: date })}
              slotProps={{ textField: { size: 'small' } }}
            />
          </Box>
        );

      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(filter.value)}
                onChange={(e) => onFilterChange(filter.id, e.target.checked)}
              />
            }
            label={filter.label}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {filters.map((filter) => (
        <Box key={filter.id} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          {renderField(filter)}
        </Box>
      ))}
    </Box>
  );
}

export default DynamicForm; 