import axios from 'axios';

// Sample data structure for different chart types
const sampleData = {
  salesByMonth: {
    xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    yAxis: [30, 40, 35, 50, 49, 60],
    type: 'line'
  },
  productSales: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    series: [44, 55, 41, 17],
    type: 'pie'
  },
  monthlyRevenue: {
    xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
    yAxis: [100, 150, 200, 180],
    type: 'bar'
  },
  categoryDistribution: {
    labels: ['Electronics', 'Clothing', 'Books', 'Food'],
    series: [30, 25, 15, 30],
    type: 'donut'
  }
};

export const fetchDashboardData = async (apiUrl, filters = {}) => {
  try {
    // In development, use sample data
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      // Apply filters to the data
      let filteredData = { ...sampleData };
      
      // Example of filter application
      if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        // Filter data based on date range
        Object.keys(filteredData).forEach(key => {
          if (filteredData[key].xAxis) {
            // Apply date filtering logic here
            const startIndex = 0; // Calculate based on start date
            const endIndex = filteredData[key].xAxis.length; // Calculate based on end date
            filteredData[key] = {
              ...filteredData[key],
              xAxis: filteredData[key].xAxis.slice(startIndex, endIndex),
              yAxis: filteredData[key].yAxis.slice(startIndex, endIndex)
            };
          }
        });
      }

      if (filters.category) {
        // Filter by category
        Object.keys(filteredData).forEach(key => {
          if (filteredData[key].labels) {
            const categoryIndex = filteredData[key].labels.indexOf(filters.category);
            if (categoryIndex !== -1) {
              filteredData[key] = {
                ...filteredData[key],
                labels: [filteredData[key].labels[categoryIndex]],
                series: [filteredData[key].series[categoryIndex]]
              };
            }
          }
        });
      }

      return filteredData;
    }

    // In production, make actual API call
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${apiUrl}?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export const validateChartData = (chartType, data) => {
  if (!data) return false;

  switch (chartType) {
    case 'line':
    case 'bar':
      return (
        data.xAxis &&
        data.yAxis &&
        Array.isArray(data.xAxis) &&
        Array.isArray(data.yAxis) &&
        data.xAxis.length === data.yAxis.length
      );

    case 'pie':
    case 'donut':
      return (
        data.labels &&
        data.series &&
        Array.isArray(data.labels) &&
        Array.isArray(data.series) &&
        data.labels.length === data.series.length
      );

    case 'liveGraph':
      return (
        data.xAxis &&
        data.yAxis &&
        Array.isArray(data.xAxis) &&
        Array.isArray(data.yAxis)
      );

    default:
      return false;
  }
};

// This is a mock API service
export const fetchChartData = async (key, xAxis, yAxis) => {
  // In a real application, this would make an API call
  // For now, returning mock data
  const mockData = [
    { [xAxis]: '2024-01', [key]: 150 },
    { [xAxis]: '2024-02', [key]: 230 },
    { [xAxis]: '2024-03', [key]: 180 },
    { [xAxis]: '2024-04', [key]: 290 },
    { [xAxis]: '2024-05', [key]: 200 },
    { [xAxis]: '2024-06', [key]: 340 }
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};

export const applyFilters = (data, filters) => {
  return data.filter(item => {
    for (const filter of filters) {
      if (filter.type === 'dateRange' && filter.value?.start && filter.value?.end) {
        const itemDate = new Date(item[filter.key]);
        const start = new Date(filter.value.start);
        const end = new Date(filter.value.end);
        if (itemDate < start || itemDate > end) return false;
      }
      // Add other filter type handling here
    }
    return true;
  });
};

// Sample data endpoints
const SAMPLE_ENDPOINTS = {
  sales: {
    url: '/api/sales',
    data: [
      { month: 'Jan', sales: 100, revenue: 150 },
      { month: 'Feb', sales: 200, revenue: 250 },
      { month: 'Mar', sales: 150, revenue: 200 },
      { month: 'Apr', sales: 300, revenue: 350 },
      { month: 'May', sales: 250, revenue: 300 },
      { month: 'Jun', sales: 400, revenue: 450 }
    ]
  },
  categories: {
    url: '/api/categories',
    data: [
      { category: 'Electronics', value: 30 },
      { category: 'Clothing', value: 25 },
      { category: 'Books', value: 15 },
      { category: 'Food', value: 30 }
    ]
  },
  products: {
    url: '/api/products',
    data: [
      { name: 'Product A', sales: 100, stock: 50 },
      { name: 'Product B', sales: 150, stock: 30 },
      { name: 'Product C', sales: 80, stock: 60 },
      { name: 'Product D', sales: 200, stock: 20 }
    ]
  }
};

// Mock API interceptor
axios.interceptors.request.use(async (config) => {
  // Check if this is a sample endpoint
  const endpoint = Object.values(SAMPLE_ENDPOINTS).find(e => 
    config.url.includes(e.url)
  );

  if (endpoint) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...config,
          data: endpoint.data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: config
        });
      }, 500); // Simulate network delay
    });
  }

  return config;
});

export const getSampleEndpoints = () => {
  return Object.entries(SAMPLE_ENDPOINTS).map(([key, value]) => ({
    name: key,
    url: `http://localhost:3000${value.url}`,
    description: `Sample ${key} data`
  }));
};

export const fetchDashboards = async () => {
  try {
    const response = await axios.get('http://localhost:3001/dashboards');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    throw error;
  }
};

export const fetchDashboardById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/dashboards/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    throw error;
  }
};

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3001';

// Add a response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('API Response:', {
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      error: error.message
    });
    return Promise.reject(error);
  }
);

export default {
  getSampleEndpoints
}; 