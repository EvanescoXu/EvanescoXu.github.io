const fallback = [{src:'assets/home-reference.png',alt:'A palm tree reflected in a puddle on stone paving',reference:true}];
const slides = Array.isArray(window.PHOTOS) && window.PHOTOS.length ? window.PHOTOS : fallback;
function makeImage(slide){const img=new Image();img.alt=slide.alt||'';img.className=slide.reference?'reference':'original';img.src=slide.src;return img;}
const hero=document.querySelector('#hero');
if(hero){
 let current=0,timer,busy=false,opened=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const viewer=document.createElement('dialog');viewer.id='art-viewer';viewer.innerHTML='<button class="art-close" aria-label="Close">×</button><div class="art-body"></div>';document.body.append(viewer);
 const frame=slide=>{const el=document.createElement('div');el.className='hero-slide';el.append(makeImage(slide));return el};
 hero.replaceChildren(frame(slides[0]));hero.tabIndex=0;hero.setAttribute('role','button');hero.setAttribute('aria-label','Enlarge photograph');
 const schedule=()=>{clearTimeout(timer);if(slides.length>1&&!document.hidden&&!opened&&!busy)timer=setTimeout(advance,5000)};
 async function advance(){
  if(document.hidden||opened||busy)return;busy=true;
  const nextIndex=(current+1)%slides.length,next=frame(slides[nextIndex]);
  try{await next.firstElementChild.decode()}catch{busy=false;schedule();return}
  if(opened||document.hidden){busy=false;schedule();return}
  const old=hero.firstElementChild;hero.append(next);
  if(!reduced.matches){
   const options={duration:800,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'};
   await Promise.all([old.animate([{transform:'translateX(0)'},{transform:'translateX(-100%)'}],options).finished,next.animate([{transform:'translateX(100%)'},{transform:'translateX(0)'}],options).finished]);
  }
  old.remove();current=nextIndex;busy=false;schedule();
 }
 function enlarge(){if(busy||opened)return;opened=true;clearTimeout(timer);viewer.classList.remove('closing');const img=makeImage(slides[current]);img.className='';viewer.querySelector('.art-body').replaceChildren(img);viewer.showModal()}
 function shrink(){if(!opened||viewer.classList.contains('closing'))return;viewer.classList.add('closing');setTimeout(()=>{viewer.close();viewer.classList.remove('closing');opened=false;hero.focus({preventScroll:true});schedule()},reduced.matches?0:280)}
 hero.addEventListener('click',enlarge);hero.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enlarge()}});
 viewer.addEventListener('click',e=>{if(e.target===viewer||e.target.tagName==='IMG'||e.target.closest('.art-close'))shrink()});viewer.addEventListener('cancel',e=>{e.preventDefault();shrink()});
 hero.querySelector('img').decode().catch(()=>{}).then(schedule);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else schedule()});
}
const archive=document.querySelector('#year-archive');
if(archive){
 for(let year=2026;year>=2017;year--){
  const section=document.createElement('section');section.className='year-section';
  const heading=document.createElement('h2');const label=document.createElement('span');label.textContent=year;heading.append(label);
  const windowEl=document.createElement('div');windowEl.className='year-window';
  const track=document.createElement('div');track.className='year-track';
  // Repeat five-column, two-row groups to make an unbroken horizontal loop.
  for(let copy=0;copy<5;copy++){
   const group=document.createElement('div');group.className='year-group';if(copy!==1)group.setAttribute('aria-hidden','true');
   for(let n=1;n<=10;n++){const tile=document.createElement('div');tile.className='number-photo';tile.textContent=n;tile.setAttribute('aria-label',year+' photograph '+n+' placeholder');group.append(tile)}
   track.append(group);
  }
  windowEl.append(track);section.append(heading,windowEl);archive.append(section);
 }
}

// Match each year label to the actual rendered width of the name.
if(archive){
 const name=document.querySelector('.home-link');
 function sizeYears(){
  const range=document.createRange();range.selectNodeContents(name);
  const target=range.getBoundingClientRect().width;
  archive.querySelectorAll('h2 span').forEach(label=>{
   label.style.fontSize='32px';
   const width=label.getBoundingClientRect().width;
   if(width)label.style.fontSize=`${32*target/width}px`;
  });
 }
 new ResizeObserver(sizeYears).observe(name);
 window.addEventListener('resize',sizeYears);document.fonts.ready.then(sizeYears);sizeYears();
}

// Keep all navigation in place; fade only the page content before a real page load.
let navigating=false;
document.querySelectorAll('.page-header a').forEach(link=>link.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const destination=new URL(link.href,location.href);
 const here=location.pathname.replace(/\/$/,'/index.html');
 if(destination.pathname===here){event.preventDefault();return;}
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 event.preventDefault();if(navigating)return;navigating=true;
 document.body.classList.add('leaving');
 setTimeout(()=>location.assign(destination.href),250);
}));
window.addEventListener('pageshow',()=>{navigating=false;document.body.classList.remove('leaving')});
