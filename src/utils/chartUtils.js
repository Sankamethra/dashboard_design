import { sampleChartData } from './sampleData';

export const getChartConfig = (type, data, title, xAxis, yAxis) => {
  switch (type) {
    case 'line':
      return {
        options: {
          chart: { type: 'line' },
          title: { text: title },
          xaxis: { 
            title: { text: xAxis },
            categories: data?.xAxis || sampleChartData.line.xAxis 
          },
          yaxis: { title: { text: yAxis } }
        },
        series: [{
          name: yAxis,
          data: data?.yAxis || sampleChartData.line.yAxis
        }]
      };

    case 'bar':
      return {
        options: {
          chart: { type: 'bar' },
          title: { text: title },
          xaxis: {
            title: { text: xAxis },
            categories: data?.xAxis || sampleChartData.bar.xAxis
          },
          yaxis: { title: { text: yAxis } }
        },
        series: [{
          name: yAxis,
          data: data?.yAxis || sampleChartData.bar.yAxis
        }]
      };

    case 'pie':
      return {
        options: {
          chart: { type: 'pie' },
          title: { text: title },
          labels: data?.labels || sampleChartData.pie.labels
        },
        series: data?.series || sampleChartData.pie.series
      };

    default:
      return null;
  }
}; 