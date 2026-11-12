(function(){
 let map=null,user=null;
 const detail=window.CURRENT_POI_KEY;
 const points=detail ? POIS.filter(p=>p.key===detail) : POIS;
 function icon(n){return L.divIcon({className:'poi-numbered-icon',html:'<svg xmlns="http://www.w3.org/2000/svg" width="30" height="46" viewBox="0 0 30 46"><path d="M15 0C8 0 2.5 5.5 2.5 12.5C2.5 23 15 46 15 46C15 46 27.5 23 27.5 12.5C27.5 5.5 22 0 15 0Z" fill="#2A81CB"/><text x="15" y="18" text-anchor="middle" font-size="13" font-weight="800" fill="#ff2b2b" stroke="white" stroke-width="2" paint-order="stroke">'+n+'</text></svg>',iconSize:[30,46],iconAnchor:[15,46],popupAnchor:[0,-38]});}
 function popup(p){
  const box=document.createElement('div');box.style.maxWidth='240px';
  const title=document.createElement('strong');title.textContent=p.name;box.append(title);
  const img=document.createElement('img');img.src=p.img;img.alt=p.title;img.style.width='100%';img.style.borderRadius='12px';img.addEventListener('error',()=>img.remove());box.append(img);
  const credit=document.createElement('small');credit.textContent='Fotó: '+p.imageAuthor+' · '+p.imageLicense;box.append(credit);
  const desc=document.createElement('p');desc.textContent=p.short;box.append(desc);
  const link=document.createElement('a');link.className='btn btn-accent';link.href=p.href;link.textContent='Részletek';box.append(link);
  const nav=document.createElement('a');nav.className='btn btn-blue';nav.href='https://www.google.com/maps/dir/?api=1&destination='+p.lat+','+p.lon+'&travelmode=walking';nav.target='_blank';nav.rel='noopener';nav.textContent='🧭 Navigáció';box.append(nav);
  return box;
 }
 function init(pos){
  if(!window.L){document.getElementById('mapNotice').hidden=false;return;}
  if(!map){
   map=L.map('map');
   const tiles=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19}).addTo(map);
   tiles.on('tileerror',()=>document.getElementById('mapNotice').hidden=false);
   points.forEach(p=>L.marker([p.lat,p.lon],{icon:icon(p.num)}).addTo(map).bindPopup(popup(p)));
   if(points.length===1)map.setView([points[0].lat,points[0].lon],17);
   else if(points.length)map.fitBounds(points.map(p=>[p.lat,p.lon]),{padding:[30,30]});
   else map.setView([50.0875,14.4211],15);
  }
  if(pos){
   if(user)user.setLatLng([pos.lat,pos.lon]);
   else user=L.circleMarker([pos.lat,pos.lon],{radius:7,color:'#ff4d4d',weight:2,fillOpacity:.35}).addTo(map).bindPopup('Saját pozíció');
  }
 }
 window.PRG_INIT_MAP=init;window.PRG_INIT_POI_MAP=init;
})();
