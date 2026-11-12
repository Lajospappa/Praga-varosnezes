// assets/js/gps.js
(function(){
  function haversineMeters(lat1, lon1, lat2, lon2){
    const R = 6371000;
    const toRad = (d)=> d * Math.PI/180;
    const dLat = toRad(lat2-lat1);
    const dLon = toRad(lon2-lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
    const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R*c;
  }
  function fmtMeters(m){
    if (m == null || !isFinite(m)) return "—";
    if (m < 1000) return Math.round(m) + " m";
    return (m/1000).toFixed(2).replace(".", ",") + " km";
  }
  function save(key, val){
    try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){}
  }
  function load(key, fallback){
    try{
      const v = localStorage.getItem(key);
      if (v == null) return fallback;
      return JSON.parse(v);
    }catch(e){ return fallback; }
  }
  function getPosOnce(timeoutMs){
    return new Promise((resolve)=>{
      if (!("geolocation" in navigator)) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        (pos)=> resolve({lat: pos.coords.latitude, lon: pos.coords.longitude, acc: pos.coords.accuracy || null}),
        ()=> resolve(null),
        { enableHighAccuracy:true, maximumAge: 0, timeout: timeoutMs || 12000 }
      );
    });
  }
  window.PRGGPS = { haversineMeters, fmtMeters, save, load, getPosOnce };
})();
