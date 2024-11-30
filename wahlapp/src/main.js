import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController, LineController, LineElement, PointElement, PieController, ArcElement } from 'chart.js';

// Register all necessary components for Bar, Line, and Pie charts
ChartJS.register(
  CategoryScale,    // For the X-axis in bar and line charts
  LinearScale,      // For the Y-axis in bar and line charts
  BarElement,       // For rendering bars in bar charts
  Title,            // For adding titles to charts
  Tooltip,          // For enabling tooltips
  Legend,           // For the chart legend
  BarController,    // For the bar chart controller
  LineController,   // For the line chart controller
  LineElement,      // For the line elements in line charts
  PointElement,     // For the data points in line charts
  PieController,    // For the pie chart controller
  ArcElement        // For rendering pie chart segments
);

const app = createApp(App);

// Optionally, register Chart globally
app.config.globalProperties.$chart = ChartJS;

app.use(createPinia());
app.use(router);

app.mount('#app');
