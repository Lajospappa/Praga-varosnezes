// assets/js/page_poi.js
(function(){
  const { haversineMeters, fmtMeters, getPosOnce } = window.PRGGPS;
  const { speakHu, stop, warmup } = window.PRGTTS;

  const key = window.CURRENT_POI_KEY;
  const p = POIS.find(x => x.key === key);

  const elDist = document.getElementById("distanceDisplay");
  const elStatus = document.getElementById("statusDisplay");
  const btnMeasure = document.getElementById("measureBtn");
  const btnList = document.getElementById("btnList");
  const btnNav = document.getElementById("btnNav");
  const btnNext = document.getElementById("btnNext");
  const btnPlay = document.getElementById("ttsPlay");
  const btnStop = document.getElementById("ttsStop");

  function setStatus(t){ if (elStatus) elStatus.textContent = t || ""; }
  function setDist(m){ if (elDist) elDist.textContent = "Távolság: " + fmtMeters(m); }

  function openGmaps(){
    if (!p) return;
    const url = "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(p.lat + "," + p.lon) + "&travelmode=walking";
    window.open(url, "_blank", "noopener");
  }

  async function measure(){
    setStatus("Helyadat lekérés...");
    const pos = await getPosOnce(12000);
    if (!pos){
      setStatus("Helyadat nem elérhető. Engedélyezd a helymeghatározást.");
      setDist(NaN);
      return;
    }
    const m = haversineMeters(pos.lat, pos.lon, p.lat, p.lon);
    setStatus("Helyadat OK.");
    setDist(m);
    try{ window.PRG_INIT_POI_MAP && window.PRG_INIT_POI_MAP(pos); }catch(e){}
  }

  function goList(){ window.location.href = "index.html"; }

  function goNext(){
    if (!p) return;
    const idx = POIS.findIndex(x => x.key === p.key);
    const nxt = (idx >= 0 && idx < POIS.length-1) ? POIS[idx+1] : null;
    if (!nxt) return setStatus("Nincs több POI.");
    window.location.href = nxt.href;
  }

  function setupTTS(){
    warmup();
    window.addEventListener("pagehide", stop);
    if (btnPlay) btnPlay.addEventListener("click", ()=>{
      const txt = (document.getElementById("contentText")||{}).innerText || "";
      const r = speakHu(txt);
      setStatus(r.msg);
    });
    if (btnStop) btnStop.addEventListener("click", ()=>{ stop(); setStatus("Felolvasás leállítva."); });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    if (!p) return;
    if (btnMeasure) btnMeasure.addEventListener("click", measure);
    if (btnList) btnList.addEventListener("click", goList);
    if (btnNav) btnNav.addEventListener("click", openGmaps);
    if (btnNext) btnNext.addEventListener("click", goNext);
    if (btnNext && p.num === POIS.length) { btnNext.textContent = "Utolsó állomás"; btnNext.disabled = true; }
    setupTTS();
    try{ window.PRG_INIT_POI_MAP && window.PRG_INIT_POI_MAP(null); }catch(e){}
    measure();
  });
})();
