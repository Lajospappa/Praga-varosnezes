// Hosszú magyar idegenvezetői szövegek felolvasása rövid, egymást követő szakaszokkal.
(function(){
  let generation=0, current=null;
  function getVoicesSafe(){try{return window.speechSynthesis ? speechSynthesis.getVoices() : [];}catch(e){return [];}}
  function pickHuVoice(){return getVoicesSafe().find(v=>(v.lang||'').toLowerCase().startsWith('hu'))||null;}
  function splitText(text){
    const pieces=[];
    for(const paragraph of text.split(/\n+/).map(s=>s.trim()).filter(Boolean)){
      const sentences=paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[paragraph];
      let chunk='';
      for(const sentence of sentences){
        if(chunk && (chunk+' '+sentence).length>260){pieces.push(chunk.trim());chunk='';}
        if(sentence.length>400){
          if(chunk){pieces.push(chunk.trim());chunk='';}
          let words='';
          for(const word of sentence.split(/\s+/)){
            if(words && (words+' '+word).length>260){pieces.push(words.trim());words='';}
            words+=(words?' ':'')+word;
          }
          if(words)pieces.push(words.trim());
        }else chunk+=(chunk?' ':'')+sentence.trim();
      }
      if(chunk)pieces.push(chunk.trim());
    }
    return pieces;
  }
  function stop(){generation++;current=null;try{window.speechSynthesis&&speechSynthesis.cancel();}catch(e){}}
  function speakHu(text){
    if(!('speechSynthesis' in window))return{ok:false,msg:'A böngésző nem támogatja a felolvasást.'};
    if(!text||!text.trim())return{ok:false,msg:'Nincs felolvasható szöveg.'};
    stop();const token=generation,parts=splitText(text);let index=0;
    function next(){
      if(token!==generation||index>=parts.length){current=null;return;}
      const u=new SpeechSynthesisUtterance(parts[index++]);current=u;u.lang='hu-HU';
      const voice=pickHuVoice();if(voice)u.voice=voice;
      u.onend=()=>{if(token===generation)next();};
      u.onerror=()=>{if(token===generation){current=null;const el=document.getElementById('statusDisplay');if(el)el.textContent='A felolvasás megszakadt. A Felolvasás gombbal újraindítható.';}};
      speechSynthesis.speak(u);
    }
    try{next();return{ok:true,msg:'Magyar felolvasás indult.'};}catch(e){stop();return{ok:false,msg:'A felolvasást ezen az eszközön nem sikerült elindítani.'};}
  }
  function warmup(){getVoicesSafe();}
  window.PRGTTS={speakHu,stop,warmup};
})();
