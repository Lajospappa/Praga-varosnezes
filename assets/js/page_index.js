// assets/js/page_index.js
(function(){
  const { haversineMeters, fmtMeters, save, load, getPosOnce } = window.PRGGPS;

  const gpsNotice = document.getElementById("gpsNotice");
  const btnNearest = document.getElementById("btnNearest");

  function setBadge(key, txt, ok){
    const el = document.querySelector('[data-badgetext="'+key+'"]');
    if (el) el.textContent = txt;
    const dot = document.querySelector('[data-dot="'+key+'"]');
    if (dot){
      dot.classList.remove("warn","ok");
      dot.classList.add(ok ? "ok" : "warn");
    }
  }
  function setDist(key, m){
    const el = document.querySelector('[data-dist="'+key+'"]');
    if (el) el.textContent = "távolság: " + fmtMeters(m);
  }
  function scrollToPoi(key){
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({behavior:"smooth", block:"center"});
  }

  function computeDistances(pos){
    const out = {};
    for (const p of POIS){
      out[p.key] = haversineMeters(pos.lat, pos.lon, p.lat, p.lon);
    }
    return out;
  }

  function nearestKey(d){
    let bestK = null;
    let bestM = Infinity;
    for (const k in d){
      if (d[k] < bestM){ bestM = d[k]; bestK = k; }
    }
    return bestK;
  }

  async function runMeasureCycle(scrollAfter){
    if (gpsNotice) gpsNotice.style.display = "none";
    for (const p of POIS){
      setBadge(p.key, "mérés: várakozás", false);
      setDist(p.key, NaN);
    }

    const posA = await getPosOnce(12000);
    if (!posA){
      if (gpsNotice) gpsNotice.style.display = "block";
      for (const p of POIS) setBadge(p.key, "helyadat nem elérhető", false);
      return;
    }

    const dA = computeDistances(posA);
    for (const p of POIS){
      setDist(p.key, dA[p.key]);
      setBadge(p.key, "mérve", true);
    }

    if (scrollAfter){
      const k = nearestKey(dA);
      if (k) scrollToPoi(k);
    }

    window.setTimeout(async ()=>{
      const posB = await getPosOnce(12000);
      if (!posB) return;
      window.PRG_INIT_MAP(posB);
      const dB = computeDistances(posB);
      for (const p of POIS){
        setDist(p.key, dB[p.key]);
        setBadge(p.key, "mérve", true);
      }
    }, 5000);

    try{ window.PRG_INIT_MAP && window.PRG_INIT_MAP(posA); }catch(e){}
  }

  function setupScrollRestore(){
    const y = load("PRG_index_scrollY", null);
    if (!window.location.hash && typeof y === "number" && y > 0) setTimeout(()=> window.scrollTo(0, y), 60);
    window.addEventListener("beforeunload", ()=> save("PRG_index_scrollY", window.scrollY || 0));
  }

  function attachListLinks(){
    document.querySelectorAll('[data-poi-href]').forEach(a=>{
      a.addEventListener("click", ()=>{
        save("PRG_index_scrollY", window.scrollY || 0);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    window.PRG_INIT_MAP(null);
    setupScrollRestore();
    attachListLinks();
    runMeasureCycle(false);
    if (btnNearest) btnNearest.addEventListener("click", ()=> runMeasureCycle(true));
  });
})();
