class SiteHeader extends HTMLElement{connectedCallback(){
const L=[['/pity-calculator/','Pity'],['/weapon-banner-calculator/','Weapon Banner'],['/topup-calculator/','Top-Up'],['/wish-converter/','Converter'],['/about/','About']];
const gem='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 4l22 20-22 36L10 24z" fill="#8fd9ff"/><path d="M32 4l22 20H10z" fill="#c9bdff"/><path d="M32 24l22 0-22 36z" fill="#a58bff"/></svg>';
this.innerHTML=`<header class="hd"><div class="w"><a class="logo" href="/"><span class="gt">${gem}PrimogemCalc</span></a><button class="mb" aria-label="Toggle menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button><nav aria-label="Main">${L.map(([h,t])=>`<a href="${h}"${location.pathname===h?' aria-current="page"':''}>${t}</a>`).join('')}</nav></div></header>`;
const b=this.querySelector('.mb'),n=this.querySelector('nav');b.onclick=()=>b.setAttribute('aria-expanded',n.classList.toggle('o'))}}
customElements.define('site-header',SiteHeader);
