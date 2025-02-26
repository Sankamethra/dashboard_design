export const sampleChartData = {
  line: {
    xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    yAxis: [30, 40, 35, 50, 49]
  },
  bar: {
    xAxis: ['Product A', 'Product B', 'Product C', 'Product D'],
    yAxis: [44, 55, 41, 67]
  },
  pie: {
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    series: [44, 55, 13, 43]
  },
  donut: {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    series: [44, 55, 41]
  }
};

export const sampleApiResponse = {
  data: {
    sales: [
      { month: 'Jan', value: 1000 },
      { month: 'Feb', value: 1500 },
      { month: 'Mar', value: 1200 },
      { month: 'Apr', value: 1800 },
      { month: 'May', value: 2000 }
    ],
    categories: ['Electronics', 'Clothing', 'Books', 'Food'],
    filterOptions: {
      departments: ['Sales', 'Marketing', 'IT', 'HR'],
      dateRange: {
        start: '2024-01-01',
        end: '2024-12-31'
      }
    }
  }
};