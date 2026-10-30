(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* scroll progress bar in nav */
const nav=$('#nav');
function prog(){const max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,scrollY/max):0;nav.style.setProperty('--p',p*100+'%')}
addEventListener('scroll',prog,{passive:true});addEventListener('resize',prog);prog();
/* reveal */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}):null;
$$('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));
/* hero */
const st=$('#stage');
if(st){
const pic=$('#pic'),hov=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(hov){pic.addEventListener('pointerenter',()=>st.classList.add('open'));st.addEventListener('pointerleave',()=>st.classList.remove('open'));st.addEventListener('focusout',()=>setTimeout(()=>{if(!st.matches(':hover'))st.classList.remove('open')},60))}
else pic.addEventListener('click',()=>st.classList.toggle('open'));
}
/* projects: click -> zoom (10px gap) -> open project page */
const tr=$('#track');
if(tr){
const IMG={nf:'assets/projects/neuralflow.jpg',fw:'assets/projects/frame-work.jpg',jg:'assets/projects/myjobgator.jpg'};
const PRJ=[
['NEURALFLOW','AI SaaS website template with a hero, features, interactive demo, pricing and contact form.',['HTML','CSS','JS'],'#1b2a6b','#070b1f','nf','projects/neuralflow/index.html'],
['FRAME/WORK','Video editor portfolio and agency website with work, services, about, contact and case-study pages.',['HTML','CSS','JS'],'#2a3a05','#0a0d02','fw','projects/frame-work/index.html'],
['MyJobGator (concept)','Concept build of a job board landing page with sectors, featured job listings, career advice and a sign-up section.',['HTML','CSS','JS'],'#0f5a3a','#06150f','jg','projects/myjobgator/index.html']];
PRJ.forEach((p,i)=>{const c=document.createElement('a');c.className='card';c.href=p[6];c.target='_blank';c.rel='noopener';c.style.setProperty('--c1',p[3]);c.style.setProperty('--c2',p[4]);
c.innerHTML=`<i class="shot" style="background-image:url(${IMG[p[5]]})"></i><b>0${i+1}</b><h3>${p[0]}</h3><p>${p[1]}</p><div>${p[2].map(t=>`<em>${t}</em>`).join('')}</div><div class="more"><div class="scr"><img src="${IMG[p[5]]}" alt="" decoding="async"></div></div>`;tr.append(c)});
const step=()=>tr.querySelector('.card').offsetWidth+22;
$('#pv').addEventListener('click',()=>tr.scrollBy({left:-step(),behavior:'smooth'}));
$('#nx').addEventListener('click',()=>tr.scrollBy({left:step(),behavior:'smooth'}));
const ov=$('#ov');let pop=null,going=false;const reset=()=>{going=false;if(pop){pop.remove();pop=null}ov.classList.remove('on');document.documentElement.classList.remove('lock');$$('.card').forEach(c=>c.style.visibility='')};
const GAP=10,put=(e,t,l,w,h)=>{e.style.top=t+'px';e.style.left=l+'px';e.style.width=w+'px';e.style.height=h+'px'};
const full=e=>put(e,GAP,GAP,document.documentElement.clientWidth-2*GAP,document.documentElement.clientHeight-2*GAP);
function zoom(c){if(going)return;going=true;const href=c.getAttribute('href');
if(RM){window.open(href,'_blank','noopener');going=false;return}
const r=c.getBoundingClientRect();pop=c.cloneNode(true);pop.removeAttribute('href');pop.classList.add('pop');put(pop,r.top,r.left,r.width,r.height);document.body.append(pop);document.documentElement.classList.add('lock');c.style.visibility='hidden';ov.classList.add('on');void pop.offsetWidth;pop.classList.add('big');full(pop);window.open(href,'_blank','noopener');setTimeout(reset,1100)}
tr.addEventListener('click',e=>{const c=e.target.closest('.card');if(!c||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;e.preventDefault();zoom(c)});
addEventListener('resize',()=>{if(pop)full(pop)});
addEventListener('pageshow',e=>{if(e.persisted)reset()});
}
/* footer marquee */
const mq=$('#mq');if(mq)mq.innerHTML=mq.innerHTML.repeat(4);
/* fire fx */
const cv=$('#fx');
if(cv){const cx=cv.getContext('2d');let W=0,H=0,P=[],on=false,last=0;
function fit(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)}
addEventListener('resize',fit);fit();
function ember(x,y,s,k){s=s||1;k=k||1;P.push({x,y,vx:(Math.random()-.5)*1.2*s,vy:-(.4+Math.random()*1.4)*s,l:0,m:(34+Math.random()*30)*k,r:1+Math.random()*2.2,h:12+Math.random()*34})}
function kick(){if(!on){on=true;last=performance.now();requestAnimationFrame(tick)}}
function tick(now){const dt=Math.max(.3,Math.min(2.5,(now-last)/16.7||1));last=now;cx.clearRect(0,0,W,H);cx.globalCompositeOperation='lighter';
for(const p of P){p.l+=dt;const a=1-p.l/p.m;if(a<=0)continue;p.x+=(p.vx+Math.sin(p.l*.2+p.h)*.4)*dt;p.y+=p.vy*dt;p.vy-=.012*dt;
cx.fillStyle=`hsla(${p.h},100%,${55+a*30}%,${a*.5})`;cx.beginPath();cx.arc(p.x,p.y,p.r*3,0,6.283);cx.fill();
cx.fillStyle=`hsla(${p.h+15},100%,85%,${a})`;cx.beginPath();cx.arc(p.x,p.y,p.r*.8,0,6.283);cx.fill()}
P=P.filter(p=>p.l<p.m);cx.globalCompositeOperation='source-over';
if(P.length)requestAnimationFrame(tick);else{on=false;cx.clearRect(0,0,W,H)}}
if(!RM){
addEventListener('click',e=>{if(e.detail===0)return;for(let i=0;i<8;i++){const a=Math.random()*6.283,sp=.6+Math.random()*1.2;P.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,l:0,m:16+Math.random()*10,r:.5+Math.random()*.5,h:15+Math.random()*30})}kick()});
const ab=$('#about');if(ab)ab.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;if(Math.random()<.04){ember(e.clientX+(Math.random()-.5)*8,e.clientY+(Math.random()-.5)*8,.5,.5);kick()}})}
}
})();
