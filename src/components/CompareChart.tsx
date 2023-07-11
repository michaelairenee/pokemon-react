import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { capitalization } from "../utils/utils";

Chart.register(CategoryScale);

interface Result {
  data: any;
}

const BaseChart = ({ data }: Result) => {
  const chartData = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: capitalization(data[0].name),
        data: data[0].stats.map((val: any) => val.base_stat),
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 0, 0, 0.6)",
          "rgba(255, 0, 0, 0.6)",
          "rgba(255, 0, 0, 0.6)",
        ],
        borderColor: "rgba(255, 0, 0, 0.2)",
        borderWidth: 1,
      },
      {
        label: capitalization(data[1].name),
        data: data[1].stats.map((val: any) => val.base_stat),
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 0, 255, 0.6)",
          "rgba(255, 0, 255, 0.6)",
          "rgba(255, 0, 255, 0.6)",
        ],
        borderColor: "rgba(255, 0, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };
  return <Line data={chartData} />;
};

const EffortChart = ({ data }: Result) => {
  const chartData = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: capitalization(data[0].name),
        data: data[0].stats.map((val: any) => val.effort),
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 0, 0, 0.6)",
          "rgba(255, 0, 0, 0.6)",
          "rgba(255, 0, 0, 0.6)",
        ],
        borderColor: "rgba(255, 0, 0, 0.2)",
        borderWidth: 1,
      },
      {
        label: capitalization(data[1].name),
        data: data[1].stats.map((val: any) => val.effort),
        // you can set indiviual colors for each bar
        backgroundColor: [
          "rgba(255, 0, 255, 0.6)",
          "rgba(255, 0, 255, 0.6)",
          "rgba(255, 0, 255, 0.6)",
        ],
        borderColor: "rgba(255, 0, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };
  return <Line data={chartData} />;
};

export { BaseChart, EffortChart };
