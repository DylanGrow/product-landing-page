
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));
const topBtn=document.getElementById('toTop');
window.addEventListener('scroll',()=>{topBtn.classList.toggle('show',scrollY>600)});
topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'))}
const cookie=document.getElementById('cookie');
if(!localStorage.getItem('ge-consent')){cookie.classList.add('show')}
document.getElementById('acceptCookies')?.addEventListener('click',()=>{localStorage.setItem('ge-consent','1');cookie.classList.remove('show');window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXX')});
document.querySelectorAll('[data-ga]').forEach(el=>el.addEventListener('click',()=>{window.dataLayer=window.dataLayer||[];dataLayer.push({event:'interaction',label:el.dataset.ga})}));
