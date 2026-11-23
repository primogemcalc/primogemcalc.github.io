class SiteHeader extends HTMLElement{connectedCallback(){
const L=[['/pity-calculator/','Pity'],['/weapon-banner-calculator/','Weapon Banner'],['/topup-calculator/','Top-Up'],['/wish-converter/','Converter']];
this.innerHTML=`<header class="hd"><div class="w"><a class="logo gt" href="/">💎 PrimogemCalc</a><button class="mb" aria-label="Toggle menu" aria-expanded="false">☰</button><nav aria-label="Main">${L.map(([h,t])=>`<a href="${h}"${location.pathname===h?' aria-current="page"':''}>${t}</a>`).join('')}</nav></div></header>`;
const b=this.querySelector('.mb'),n=this.querySelector('nav');b.onclick=()=>b.setAttribute('aria-expanded',n.classList.toggle('o'))}}
customElements.define('site-header',SiteHeader);
