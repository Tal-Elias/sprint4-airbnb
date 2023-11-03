import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { utilService } from '../services/util.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Average rating',
    },
  },
};

const labels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Rating',
      data: [4.77, 4.68, 4.89, 4.93, 4.57, 4.86, 4.52],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function AverageRating() {
  return (
    <div className='average-rating'>
      <Line options={options} data={data} />
    </div>
  )
}