import { Storage } from './storage.js';
import { renderLogs } from './logs.js';
import { initChart } from './chart.js';

window.onload = () => {
    const logs = Storage.getLogs();
    renderLogs(logs);
    initChart(logs, (evt, elements) => { /* グラフのクリックイベント */ });
};
