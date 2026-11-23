const $=s=>document.querySelector(s),v=i=>Math.max(0,+(document.getElementById(i)||{}).value||0),f=n=>Math.round(n).toLocaleString(),T=document.body.dataset.tool;
const M={char:{P:90,r:n=>n<74?.006:Math.min(1,.006+.06*(n-73))},wep:{P:77,r:n=>n<63?.007:Math.min(1,.007+.07*(n-62))}};
// DP over wishes. State: pity p, flag g (guaranteed / Fate Point). win = featured chance on a 5-star when g=0.
function run(m,p0,g0,t,W,win){const P=m.P,S=2*P;let cur=Array.from({length:t},()=>new Float64Array(S)),done=0,ex=0,at=0;cur[0][g0*P+p0]=1;
for(let w=1;w<=1600;w++){ex+=1-done;const nx=Array.from({length:t},()=>new Float64Array(S));
for(let c=0;c<t;c++)for(let g=0;g<2;g++)for(let p=0;p<P;p++){const x=cur[c][g*P+p];if(!x)continue;const r=p+1>=P?1:m.r(p+1),h=x*r,wn=h*(g?1:win);
if(r<1)nx[c][g*P+p+1]+=x*(1-r);if(c+1>=t)done+=wn;else nx[c+1][0]+=wn;nx[c][P]+=h-wn}
cur=nx;if(w===W)at=done;if(w>=W&&done>.99999)break}return{at,ex}}
function res(h){$('#out').innerHTML=h}
function pity(){const wp=T==='weapon',m=wp?M.wep:M.char,P=m.P,W=v('fates')+Math.floor(v('primos')/160),t=Math.max(1,Math.min(7,v('t')||1)),p=Math.min(v('pity'),P-1),g=+$('#g').value,win=wp?.375:(+$('#cr').value?.55:.5);
const r=run(m,p,g,t,W,win),worst=(g?P:2*P)+(t-1)*2*P;
res(`<p class="sub">With ${f(W)} wishes available:</p><div class="big">${(r.at*100).toFixed(1)}%</div><p>chance to get ${t} ${wp?'chosen weapon':'featured 5★'} cop${t>1?'ies':'y'}</p><div class="grid" style="margin-top:16px"><div><h3>${f(r.ex)} wishes</h3><p>average needed (${f(r.ex*160)} Primogems)</p></div><div><h3>${f(worst)} wishes</h3><p>worst case (${f(worst*160)} Primogems)</p></div></div>`)}
const PK=[['60 Crystals',.99,60,120],['300 + 30 Crystals',4.99,330,600],['980 + 110 Crystals',14.99,1090,1960],['1980 + 260 Crystals',29.99,2240,3960],['3280 + 600 Crystals',49.99,3880,6560],['6480 + 1600 Crystals',99.99,8080,12960],['Blessing of the Welkin Moon (30 days)',4.99,3000,3000],['Gnostic Hymn battle pass (4 Fates)',9.99,640,640]];
const FX={USD:1,EUR:.92,GBP:.79,INR:85,PKR:280,CAD:1.37,AUD:1.5};
function topup(){const c=$('#cur').value,x=FX[c],ft=$('#ft').value==='1';
const rows=PK.map(([n,u,s,d],i)=>{const o=ft&&i<6?d:s;return[n,u*x,o,o/u]}).sort((a,b)=>b[3]-a[3]);
res(`<div class="tw"><table><tr><th>Option</th><th>Price (${c}, approx.)</th><th>Primogems</th><th>Wishes</th><th>Primos per USD</th></tr>${rows.map((r,i)=>`<tr${i?'':' class="best"'}><td>${r[0]}</td><td>${r[1].toFixed(2)}</td><td>${f(r[2])}</td><td>${(r[2]/160).toFixed(1)}</td><td>${f(r[3])}</td></tr>`).join('')}</table></div><p class="sub" style="margin-top:10px">Local prices are converted from USD at rough rates; the store may show different regional prices. Welkin Moon pays 90 Primogems per day over 30 days.</p>`)}
function conv(){const a=v('primos')+v('cry'),w=a/160+v('fates')+v('sd')/75+v('sg')/5;
res(`<div class="big">${Math.floor(w)} wishes</div><p>${w.toFixed(2)} exact pulls. ${f(a)} Primogems + Crystals, ${v('fates')} Fates, ${v('sg')} Starglitter (5 each), ${v('sd')} Stardust (75 each).</p><p class="sub">The Paimon's Bargains shop caps Starglitter and Stardust purchases at 5 Fates each per month.</p>`)}
function plan(){const days=v('days'),tot=v('primos')+days*(v('daily')+(+$('#wk').value?90:0))+v('extra'),w=v('fates')+Math.floor(tot/160);
res(`<div class="big">${f(w)} wishes</div><p>${f(tot)} Primogems saved in ${days} days, ${(w/90*100).toFixed(0)}% of a 90-wish hard pity.</p>`)}
if(T){const fn={pity,weapon:pity,topup,conv,plan}[T];document.addEventListener('input',fn);fn()}
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
