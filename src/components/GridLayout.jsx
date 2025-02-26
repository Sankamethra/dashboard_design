import { Box } from '@mui/material';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function GridLayout({ children, layouts, onLayoutChange }) {
  const defaultProps = {
    className: "layout",
    rowHeight: 30,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    containerPadding: [10, 10],
    margin: [10, 10],
  };

  return (
    <Box sx={{ 
      width: '100%',
      '& .react-grid-item': {
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
        '& .react-resizable-handle': {
          bottom: 5,
          right: 5,
          cursor: 'se-resize'
        }
      }
    }}>
      <ResponsiveGridLayout
        {...defaultProps}
        layouts={layouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layouts)}
        isDraggable
        isResizable
      >
        {children}
      </ResponsiveGridLayout>
    </Box>
  );
}

export default GridLayout; 