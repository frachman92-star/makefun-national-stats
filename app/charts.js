// Canvas charts for Nusantara Stats. Plain 2D canvas, no libraries.
// Every chart reads its data from the caller, draws axes and value labels,
// and scales to the canvas element's own size.

export function drawBarChart(canvas, labels, values, options = {}) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padLeft = 46;
  const padRight = 12;
  const padTop = 26;
  const padBottom = 30;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  ctx.clearRect(0, 0, width, height);
  const max = Math.max(...values.map(Math.abs), 1);
  const min = Math.min(0, ...values);
  const span = max - min;
  const zeroY = padTop + plotH * (max / span);
  const barW = Math.min(56, (plotW / values.length) * 0.55);
  const step = plotW / values.length;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#5b6b7a';
  ctx.fillText(max.toFixed(1), padLeft - 6, padTop + 6);
  ctx.fillText(min.toFixed(1), padLeft - 6, padTop + plotH - 6);
  ctx.strokeStyle = '#dbe4ec';
  ctx.beginPath();
  ctx.moveTo(padLeft, zeroY);
  ctx.lineTo(width - padRight, zeroY);
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  values.forEach((v, i) => {
    const x = padLeft + step * i + (step - barW) / 2;
    const h = (Math.abs(v) / span) * plotH;
    const y = v >= 0 ? zeroY - h : zeroY;
    ctx.fillStyle = v < 0 ? '#c0392b' : (options.color || '#1a6fb5');
    ctx.fillRect(x, y, barW, h);
    ctx.fillStyle = '#1c2b39';
    ctx.fillText(options.format ? options.format(v) : v.toFixed(1), x + barW / 2, v >= 0 ? y - 18 : zeroY - 18);
    ctx.fillStyle = '#5b6b7a';
    ctx.fillText(labels[i], x + barW / 2, height - 22);
  });
}

export function drawLineChart(canvas, labels, values, options = {}) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padLeft = 46;
  const padRight = 16;
  const padTop = 26;
  const padBottom = 30;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  ctx.clearRect(0, 0, width, height);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = Math.max(max - min, 0.1);
  const lo = min - span * 0.15;
  const hi = max + span * 0.15;
  const yOf = (v) => padTop + plotH * (1 - (v - lo) / (hi - lo));
  const xOf = (i) => padLeft + plotW * (values.length === 1 ? 0.5 : i / (values.length - 1));
  ctx.font = '12px system-ui, sans-serif';
  ctx.strokeStyle = '#dbe4ec';
  for (let g = 0; g <= 3; g += 1) {
    const y = padTop + (plotH * g) / 3;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
  }
  ctx.strokeStyle = options.color || '#1a6fb5';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  values.forEach((v, i) => {
    if (i === 0) ctx.moveTo(xOf(i), yOf(v));
    else ctx.lineTo(xOf(i), yOf(v));
  });
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  values.forEach((v, i) => {
    ctx.fillStyle = options.color || '#1a6fb5';
    ctx.beginPath();
    ctx.arc(xOf(i), yOf(v), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1c2b39';
    ctx.fillText(options.format ? options.format(v) : v.toFixed(2), xOf(i), yOf(v) - 20);
    ctx.fillStyle = '#5b6b7a';
    ctx.fillText(labels[i], xOf(i), height - 22);
  });
}

export function drawHBarChart(canvas, labels, values, options = {}) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padLeft = 118;
  const padRight = 58;
  const padTop = 10;
  const padBottom = 10;
  const plotW = width - padLeft - padRight;
  const rowH = (height - padTop - padBottom) / values.length;
  const barH = Math.min(20, rowH * 0.6);
  ctx.clearRect(0, 0, width, height);
  const max = Math.max(...values, 1);
  ctx.font = '12px system-ui, sans-serif';
  values.forEach((v, i) => {
    const y = padTop + rowH * i + (rowH - barH) / 2;
    ctx.fillStyle = '#1c2b39';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[i], padLeft - 8, y + barH / 2);
    ctx.fillStyle = options.color || '#1a6fb5';
    ctx.fillRect(padLeft, y, (v / max) * plotW, barH);
    ctx.fillStyle = '#1c2b39';
    ctx.textAlign = 'left';
    ctx.fillText(options.format ? options.format(v) : String(v), padLeft + (v / max) * plotW + 6, y + barH / 2);
  });
}
