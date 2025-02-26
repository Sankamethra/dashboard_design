import { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import LeftSideMenu from './LeftSideMenu';
import MiddleArea from './MiddleArea';
import RightSideArea from './RightSideArea';
import ManageDashboards from './ManageDashboards';
import ViewDashboard from './ViewDashboard';

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

    const draggedId = active.id;

    if (draggedId.startsWith('filter-') && over.id === 'filterDestination') {
      const filterType = draggedId.replace('filter-', '');
      const newFilter = {
        id: uuidv4(),
        type: filterType,
        label: '',
        key: '',
        value: filterType === 'dateRange' ? { start: null, end: null } : null
      };

      setCurrentDashboard(prev => ({
        ...prev,
        filters: [...prev.filters, newFilter]
      }));
      
      setSnackbarMessage(`Added ${filterType} filter`);
      setOpenSnackbar(true);
    }

    if (draggedId.startsWith('chart-') && over.id === 'chartDestination') {
      const chartType = draggedId.replace('chart-', '');
      const newChart = {
        id: uuidv4(),
        type: chartType,
        title: '',
        key: '',
        xAxis: '',
        yAxis: '',
        data: []
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

    const dashboardToSave = {
      ...currentDashboard,
      id: currentDashboard.id || uuidv4()
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