import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Prompt completion status",
    },
  },
};

const labels = [
  "Assigned/Writing in progress",
  "Ready for edits",
  "Sendback, waiting for writer",
  "Ready for QA",
  "Passed QA",
  "Send to engineer",
  "Accepted by engineer",
  "Edge case needing support",
];

interface BarChartProps {
  rawData: number[];
}

const BarChart = ({ rawData }: BarChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Completion Tracker",
        data: rawData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
