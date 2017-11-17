const socket = io();

function createLogEl(data) {
  const el = document.createElement('div');

  el.innerHTML = `
    <p>Temp: ${data.temp}</p>
    <p>Hum: ${data.hum}</p>
    <br>
  `;

  return el;
}

const logsContainer = document.querySelector('#logs-container');

socket.on('logs.added', (data) => {
  const logEl = createLogEl(data);

  logsContainer.append(logEl);
});