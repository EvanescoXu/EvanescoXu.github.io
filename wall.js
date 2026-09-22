const viewer=document.querySelector('#art-viewer'),body=viewer.querySelector('.art-body');let last,closing=false;
function show(){viewer.classList.remove('closing');viewer.showModal()}
document.querySelectorAll('[data-full]').forEach(button=>button.addEventListener('click',()=>{last=button;const img=new Image();img.src=button.dataset.full;img.alt=button.querySelector('img').alt;if(button.dataset.rotate){const frame=document.createElement("div");frame.className="rotated-photo";frame.append(img);body.replaceChildren(frame)}else body.replaceChildren(img);show()}));
document.querySelector('.wall-statement').addEventListener('click',event=>{last=event.currentTarget;body.replaceChildren(document.querySelector('#artist-statement').content.cloneNode(true));show()});
function close(){if(closing)return;closing=true;viewer.classList.add('closing');setTimeout(()=>{viewer.close();viewer.classList.remove('closing');closing=false},matchMedia('(prefers-reduced-motion: reduce)').matches?0:280)}
viewer.querySelector('.art-close').addEventListener('click',close);viewer.addEventListener('cancel',e=>{e.preventDefault();close()});viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close()}});viewer.addEventListener('close',()=>last?.focus());
body.addEventListener('click',event=>{if(event.target.tagName==='IMG')close()});
// Keep generous equal gaps; let the enlarged composition extend down the page.
const wall=document.querySelector('.exhibition-wall'),heading=document.querySelector('.wall-content>h1');
function fitWall(){
 wall.style.transform='none';heading.style.transform='none';
 const r=wall.getBoundingClientRect(),title=heading.getBoundingClientRect();
 const photos=[...wall.querySelectorAll('.wall-photo')];
 const top=Math.min(...photos.map(p=>p.offsetTop));
 const left=Math.min(...photos.map(p=>p.offsetLeft));
 const right=Math.max(...photos.map(p=>p.offsetLeft+p.offsetWidth));
 const bottom=Math.max(...photos.map(p=>p.offsetTop+p.offsetHeight));
 const cx=r.left+r.width/2;
 const widthScale=Math.min((cx-24)/(r.width/2-left),(document.documentElement.clientWidth-24-cx)/(right-r.width/2));
 const navBottom=Math.max(...[...document.querySelectorAll('.page-header>a,.page-header nav')].map(p=>p.getBoundingClientRect().bottom));
 const gap=56;
 const viewport=window.innerHeight;
 const available=viewport-navBottom-title.height-3*gap;
 const scale=Math.max(.01,Math.min(widthScale,available/(bottom-top)));
 const photoBottom=viewport-gap;
 const photoTop=navBottom+title.height+2*gap;
 const titleTop=navBottom+gap;
 heading.style.transform=`translateY(${titleTop-title.top}px)`;
 const dy=photoTop-r.top-top*scale;
 wall.style.transformOrigin='50% 0';
 wall.style.transform=`translateY(${dy}px) scale(${scale})`;
 wall.parentElement.style.paddingBottom='0';

}
new ResizeObserver(fitWall).observe(wall);window.addEventListener('resize',fitWall);document.fonts.ready.then(fitWall);fitWall();
