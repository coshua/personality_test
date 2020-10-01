import React from "react";
import { Doughnut } from "react-chartjs-2";

const Statistics = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        labels: data.labels,
        data: data.acc,
        fill: true,
      },
    ],
  };
  return (
    <Doughnut
      options={{
        legend: {
          display: true,
          position: "right",
        },
        tootips: {
          callbacks: {
            label: (tooltipItem, data) => {
              var label =
                data.datasets[0].labels[tooltipItem.datasetIndex].label || "";
              return label;
            },
          },
        },
      }}
      data={chartData}
      height={100}
    />
  );
};

export default Statistics;
