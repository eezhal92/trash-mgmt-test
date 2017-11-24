const socket = io();

const logsContainer = document.querySelector('#logs-container');

const logsToXAndY = (logs) => {
  return {
    x: logs.map(l => l.createdAt),
    y: logs.map(l => l.elevation),
  }
}

fetch('/logs')
  .then(res => res.json())
  .then((logs) => {
    const points = logsToXAndY(logs);
    const data = [
      { ...points, type: 'scatter' },
    ];

    const plot = Plotly.newPlot('logs-container', data);

    const pushLog = (log) => {
      data[0].x.push(log.createdAt);
      data[0].y.push(log.elevation);
    };

    socket.on('logs.added', (log) => {
      pushLog(log);
      
      Plotly.redraw('logs-container');
    });
  });