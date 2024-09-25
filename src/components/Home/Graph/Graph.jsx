import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ chartData }) => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    const canvas = chartRef.current;

    if (!chartData || !chartData.length) {
      return;
    }

    if (myChart) {
      myChart.destroy(); // Destroy the existing chart instance
    }

    const data = {
      datasets: [
        {
          label: 'My Dataset',
          data: chartData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    myChart = new Chart(canvas, {
      type: 'scatter', // Change the chart type as necessary
      data: data,
      options: {
        // Add your chart options here
      },
    });

    return () => {
      myChart.destroy(); // Clean up by destroying the chart when the component unmounts
    };
  }, [chartData]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
