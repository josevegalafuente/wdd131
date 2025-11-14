document.addEventListener("DOMContentLoaded", () => {

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const last = document.getElementById("lastModified");
  if (last) {
    const date = new Date(document.lastModified);

    last.textContent = date.toLocaleString();

    last.setAttribute("datetime", date.toISOString());
  }

  const temperatureC = 2;   
  const windKmh = 8;       

  const tempEl = document.getElementById("temp");
  const windEl = document.getElementById("wind");
  if (tempEl) tempEl.textContent = temperatureC;
  if (windEl) windEl.textContent = windKmh;

  const calculateWindChill = (t, v) =>
    13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

  const chillEl = document.getElementById("windchill");
  if (chillEl) {
    if (temperatureC <= 10 && windKmh > 4.8) {
      const wc = calculateWindChill(temperatureC, windKmh);
      chillEl.textContent = wc.toFixed(1);
    } else {
      chillEl.textContent = "N/A";
    }
  }

});

