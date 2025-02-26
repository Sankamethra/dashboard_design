import { Box, TextField, Select, MenuItem, Switch, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function FilterInput({ type, value, onChange, label, onLabelChange, onKeyChange }) {
  const handleValueChange = (newValue) => {
    onChange({
      label,
      key: value?.key || '',
      value: newValue
    });
  };

  const renderInput = () => {
    switch (type) {
      case 'input':
        return (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              label="Label"
              value={label || ''}
              onChange={(e) => onLabelChange(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Key"
              value={value?.key || ''}
              onChange={(e) => onKeyChange(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Value"
              value={value?.value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
              size="small"
            />
          </Box>
        );

      case 'numberInput':
        return (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              label="Label"
              value={label || ''}
              onChange={(e) => onLabelChange(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Key"
              value={value?.key || ''}
              onChange={(e) => onKeyChange(e.target.value)}
              size="small"
            />
            <TextField
              type="number"
              fullWidth
              label="Value"
              value={value?.value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
              size="small"
            />
          </Box>
        );

      case 'select':
        return (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              fullWidth
              label="Label"
              value={label || ''}
              onChange={(e) => onLabelChange(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Key"
              value={value?.key || ''}
              onChange={(e) => onKeyChange(e.target.value)}
              size="small"
            />
            <Select
              fullWidth
              size="small"
              value={value?.value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </Box>
        );

      case 'treeSelect':
        return (
          <Select
            fullWidth
            size="small"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <MenuItem value="parent1">Parent 1</MenuItem>
            <MenuItem value="child1" sx={{ pl: 4 }}>Child 1</MenuItem>
            <MenuItem value="child2" sx={{ pl: 4 }}>Child 2</MenuItem>
            <MenuItem value="parent2">Parent 2</MenuItem>
            <MenuItem value="child3" sx={{ pl: 4 }}>Child 3</MenuItem>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          >
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
          </RadioGroup>
        );

      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label="Toggle"
          />
        );

      case 'dateRange':
        return (
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={value?.start || null}
                onChange={(date) => onChange({ key: value?.key, start: date, end: value?.end })}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="End Date"
                value={value?.end || null}
                onChange={(date) => onChange({ key: value?.key, start: value?.start, end: date })}
                slotProps={{ textField: { size: 'small' } }}
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return renderInput();
}

export default FilterInput; 