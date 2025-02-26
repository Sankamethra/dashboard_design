import { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import LeftSideMenu from './LeftSideMenu';
import MiddleArea from './MiddleArea';
import RightSideArea from './RightSideArea';
import ManageDashboards from './ManageDashboards';
import ViewDashboard from './ViewDashboard';
import { filterComponents } from '../config/componentConfig';

function DashboardDesigner() {
  const emptyDashboard = {
    id: null,
    title: '',
    apiUrl: '',
    filters: [],
    charts: []
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [dashboards, setDashboards] = useState([]);
  const [currentDashboard, setCurrentDashboard] = useState({...emptyDashboard});
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isViewMode, setIsViewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleNewDashboard = () => {
    setCurrentDashboard({...emptyDashboard});
    setError(null);
    setSelectedTab(0);
    setIsViewMode(false);
  };

  const handleViewDashboard = (dashboard) => {
    setCurrentDashboard({...dashboard});
    setIsViewMode(true);
    setSelectedTab(dashboard.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Handle filter drops
    if (over.id === 'filterDestination') {
      const draggedFilter = filterComponents.find(f => f.id === active.id);
      if (draggedFilter) {
        const newFilter = {
          id: uuidv4(),
          type: draggedFilter.type,
          label: '',
          key: draggedFilter.key,
          value: '',
          config: {
            ...(draggedFilter.type === 'select' && { options: [''] }),
            ...(draggedFilter.type === 'radio' && { options: [''] })
          }
        };

        setCurrentDashboard(prev => ({
          ...prev,
          filters: [...prev.filters, newFilter]
        }));
      }
    }

    // Handle chart drops
    if (over.id === 'chartDestination') {
      const chartType = active.id.replace('chart-', '');
      const newChart = {
        id: uuidv4(),
        type: chartType,
        title: '',
        data: [],
        config: {
          xAxisLabel: '',
          yAxisLabel: '',
          xAxisKey: 'x',
          yAxisKey: 'y',
          lines: [{ key: 'y', label: 'Value' }],  // for line chart
          bars: [{ key: 'y', label: 'Value' }],   // for bar chart
          valueKey: 'value',   // for pie and donut charts
          labelKey: 'label',   // for pie and donut charts
          innerRadius: chartType === 'donut' ? 60 : 0  // specific to donut chart
        }
      };

      setCurrentDashboard(prev => ({
        ...prev,
        charts: [...prev.charts, newChart]
      }));
      
      setSnackbarMessage(`Added ${chartType} chart`);
      setOpenSnackbar(true);
    }
  };

  const handleSave = () => {
    if (!currentDashboard.title) {
      setError('Please enter a dashboard title');
      return;
    }

    // Validate filters
    const isFiltersValid = currentDashboard.filters.every(filter => {
      // Basic validation for all filters
      if (!filter.label) return false;

      // Specific validation based on filter type
      switch (filter.type) {
        case 'select':
        case 'radio':
          return filter.config?.options && 
                 filter.config.options.length > 0 && 
                 filter.config.options.every(option => option.trim() !== '');
        case 'input':
          return true; // Only label is required
        case 'switch':
          return true; // Only label is required
        case 'dateRange':
          return true; // Only label is required
        default:
          return true;
      }
    });

    if (!isFiltersValid) {
      setError('Please fill in all required filter fields (labels and options)');
      return;
    }

    // Validate charts - make this validation optional if you want to save without chart data
    const hasCharts = currentDashboard.charts.length > 0;
    if (hasCharts) {
      const isChartsValid = currentDashboard.charts.every(chart => {
        return chart.title && chart.data && chart.data.length > 0;
      });

      if (!isChartsValid) {
        setError('Please ensure all charts have titles and data points');
        return;
      }
    }

    const dashboardToSave = {
      ...currentDashboard,
      id: currentDashboard.id || uuidv4(),
      filters: currentDashboard.filters.map(filter => ({
        ...filter,
        config: {
          ...filter.config,
          placeholder: `Enter ${filter.label}`,
          required: true
        }
      })),
      charts: currentDashboard.charts.map(chart => ({
        ...chart,
        data: chart.data || [],
        config: {
          ...chart.config,
          xAxisLabel: chart.config?.xAxisLabel || '',
          yAxisLabel: chart.config?.yAxisLabel || '',
          xAxisKey: chart.config?.xAxisKey || 'x',
          yAxisKey: chart.config?.yAxisKey || 'y',
          lines: chart.config?.lines || [{ key: 'y', label: 'Value' }],
          bars: chart.config?.bars || [{ key: 'y', label: 'Value' }],
          valueKey: chart.config?.valueKey || 'value',
          labelKey: chart.config?.labelKey || 'label',
          innerRadius: chart.type === 'donut' ? 60 : 0
        }
      }))
    };

    setDashboards(prev => {
      if (currentDashboard.id) {
        return prev.map(d => d.id === currentDashboard.id ? dashboardToSave : d);
      }
      return [...prev, dashboardToSave];
    });

    setSnackbarMessage(currentDashboard.id ? "Dashboard updated" : "Dashboard created");
    setOpenSnackbar(true);
    setSelectedTab(1);
  };

  const handleEditDashboard = (dashboard) => {
    setCurrentDashboard({...dashboard});
    setSelectedTab(0);
  };

  const handleDeleteDashboard = (dashboardId) => {
    setDashboards(prev => prev.filter(d => d.id !== dashboardId));
    setSnackbarMessage("Dashboard deleted");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderContent = () => {
    if (selectedTab === 1) {
      return (
        <Box sx={{ flex: 1, bgcolor: 'background.default', overflow: 'auto' }}>
          <ManageDashboards
            dashboards={dashboards}
            onEdit={handleEditDashboard}
            onDelete={handleDeleteDashboard}
            onView={handleViewDashboard}
            onNew={handleNewDashboard}
          />
        </Box>
      );
    }

    if (isViewMode) {
      return (
        <Box sx={{ flex: 1, bgcolor: 'background.default', overflow: 'auto' }}>
          <ViewDashboard
            dashboard={currentDashboard}
            onEdit={() => {
              setIsViewMode(false);
              setSelectedTab(0);
            }}
          />
        </Box>
      );
    }

    return (
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        gap: 2, 
        p: 2, 
        overflow: 'auto',
        bgcolor: 'background.default'
      }}>
        <MiddleArea 
          currentDashboard={currentDashboard}
          setCurrentDashboard={setCurrentDashboard}
          onSave={handleSave}
          error={error}
        />
        
        <RightSideArea 
          currentDashboard={currentDashboard}
          setCurrentDashboard={setCurrentDashboard}
        />
      </Box>
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box sx={{ 
        display: 'flex', 
        height: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden'
      }}>
        <LeftSideMenu 
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          dashboards={dashboards}
          onNewDashboard={handleNewDashboard}
          onViewDashboard={handleViewDashboard}
        />
        {renderContent()}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Box>
    </DndContext>
  );
}

export default DashboardDesigner;