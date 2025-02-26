import { Box, TextField, Select, MenuItem, Switch, FormControlLabel, Radio, RadioGroup, Button, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

function FilterInput({ type, value, onChange, label, onLabelChange, onKeyChange, disabled }) {
  const [options, setOptions] = useState(value?.config?.options || ['']);

  const handleValueChange = (newValue) => {
    const filterConfig = {
      ...value,
      type,
      label: label || '',
      key: type,
      fieldType: type,
      config: {
        ...(type === 'select' || type === 'radio' ? { options } : {}),
        placeholder: `Enter ${label}`,
        required: true,
      },
      value: newValue
    };

    onChange(filterConfig);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, optionValue) => {
    const newOptions = [...options];
    newOptions[index] = optionValue;
    setOptions(newOptions);
    onChange({
      ...value,
      config: { ...value.config, options: newOptions }
    });
  };

  const renderInput = () => {
    const commonFields = (
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Label"
          value={label || ''}
          onChange={(e) => onLabelChange(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          disabled={disabled}
        />
        <TextField
          label="Key"
          value={value?.key || ''}
          onChange={(e) => onKeyChange(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          disabled={disabled}
        />
      </Box>
    );

    switch (type) {
      case 'input':
        return (
          <Paper sx={{ p: 2, width: '100%' }}>
            {commonFields}
            {disabled ? (
              <TextField
                fullWidth
                label="Value"
                value={value?.value || ''}
                size="small"
                disabled
              />
            ) : (
              <TextField
                fullWidth
                label="Value"
                value={value?.value || ''}
                onChange={(e) => handleValueChange(e.target.value)}
                size="small"
                placeholder="Enter value"
              />
            )}
          </Paper>
        );

      case 'select':
        return (
          <Paper sx={{ p: 2, width: '100%' }}>
            {commonFields}
            {disabled ? (
              <Select
                fullWidth
                size="small"
                value={value?.value || ''}
                disabled
              >
                {options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Options
                </Typography>
                {options.map((option, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <Button 
                      size="small" 
                      color="error" 
                      onClick={() => {
                        const newOptions = options.filter((_, i) => i !== index);
                        setOptions(newOptions);
                        onChange({ 
                          ...value, 
                          config: { ...value.config, options: newOptions } 
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={addOption} 
                  sx={{ mt: 1 }}
                >
                  Add Option
                </Button>
              </Box>
            )}
          </Paper>
        );

      case 'numberInput':
        return (
          <Paper sx={{ p: 2, width: '100%' }}>
            {commonFields}
            {disabled ? (
              <TextField
                type="number"
                fullWidth
                label="Value"
                value={value?.value || ''}
                size="small"
                disabled
              />
            ) : (
              <TextField
                type="number"
                fullWidth
                label="Value"
                value={value?.value || ''}
                onChange={(e) => handleValueChange(e.target.value)}
                size="small"
                placeholder="Enter number"
              />
            )}
          </Paper>
        );

      case 'dateRange':
        return (
          <Paper sx={{ p: 2, width: '100%' }}>
            {commonFields}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={value?.start || null}
                onChange={(date) => handleValueChange({ ...value?.value, start: date })}
                disabled={disabled}
                slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
              />
              <DatePicker
                label="End Date"
                value={value?.end || null}
                onChange={(date) => handleValueChange({ ...value?.value, end: date })}
                disabled={disabled}
                slotProps={{ textField: { size: 'small', sx: { flex: 1 } } }}
              />
            </Box>
          </Paper>
        );

      case 'switch':
        return (
          <Paper sx={{ p: 2, width: '100%' }}>
            {commonFields}
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(value?.value)}
                  onChange={(e) => handleValueChange(e.target.checked)}
                  disabled={disabled}
                />
              }
              label={label || "Toggle Switch"}
            />
          </Paper>
        );

      case 'radio':
        return (
          <Paper sx={{ p: 2, width: '100%' }}>
            {commonFields}
            {disabled ? (
              <RadioGroup
                value={value?.value || ''}
                disabled
              >
                {options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            ) : (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Radio Options
                </Typography>
                {options.map((option, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <Button 
                      size="small" 
                      color="error" 
                      onClick={() => {
                        const newOptions = options.filter((_, i) => i !== index);
                        setOptions(newOptions);
                        onChange({ 
                          ...value, 
                          config: { ...value.config, options: newOptions } 
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={addOption} 
                  sx={{ mt: 1 }}
                >
                  Add Option
                </Button>
              </Box>
            )}
          </Paper>
        );

      default:
        return null;
    }
  };

  return renderInput();
}

export default FilterInput; 