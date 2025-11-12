document.addEventListener("DOMContentLoaded", () => {
  const last = document.getElementById("lastModified");
  if (last) last.textContent = document.lastModified;

  const tempEl = document.getElementById("temp");
  const windChillEl = document.getElementById("windchill");

  if (tempEl && windChillEl) {
    const t = Number(tempEl.textContent);    
    const v = 5;                              
    const wc = 13.12 + 0.6215*t - 11.37*Math.pow(v,0.16) + 0.3965*t*Math.pow(v,0.16);
    windChillEl.textContent = wc.toFixed(1);
  }
});
