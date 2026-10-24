const contentItems=[
{type:'image',src:'img/img1.jpg',alt:'Abrazo',text:'Cada día a tu lado fue un regalo que atesoro.'},
{type:'text',text:'Mi corazón te pertenece por completo, ahora y siempre.'},
{type:'image',src:'img/img2.jpg',alt:'Corazones',text:'Juntos, habíamos construido un mundo hermoso.'},
{type:'text',text:'Dos almas, un mismo destino, unidos por la magia de este amor divino.'}];
let currentIndex=0;
const mainImage=document.getElementById('main-image'),mainText=document.getElementById('main-text');
const prevBtn=document.getElementById('prev-btn'),nextBtn=document.getElementById('next-btn');
const counter=document.getElementById('slide-counter'),bar=document.getElementById('progress-bar'),media=document.querySelector('.media-wrap');
function updateContent(){const item=contentItems[currentIndex],num=String(currentIndex+1).padStart(2,'0');
if(item.type==='image'){mainImage.src=item.src;mainImage.alt=item.alt;media.classList.remove('text-mode')}else{media.classList.add('text-mode')}
mainText.textContent=item.text;counter.textContent=`${num} / ${String(contentItems.length).padStart(2,'0')}`;bar.style.width=`${((currentIndex+1)/contentItems.length)*100}%`;}
function goTo(i){currentIndex=(i+contentItems.length)%contentItems.length;updateContent();}
nextBtn.addEventListener('click',()=>goTo(currentIndex+1));prevBtn.addEventListener('click',()=>goTo(currentIndex-1));
let touchStartX=0;media.addEventListener('touchstart',e=>touchStartX=e.changedTouches[0].screenX,{passive:true});
media.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchStartX;if(Math.abs(dx)>45)goTo(currentIndex+(dx<0?1:-1));},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')goTo(currentIndex+1);if(e.key==='ArrowLeft')goTo(currentIndex-1);});
const music=document.getElementById('background-music'),musicBtn=document.getElementById('play-pause-btn'),icon=document.getElementById('music-icon'),player=document.getElementById('music-player');
musicBtn.addEventListener('click',async()=>{if(music.paused){try{await music.play();icon.textContent='Ⅱ';player.classList.add('playing')}catch(e){console.error(e)}}else{music.pause();icon.textContent='▶';player.classList.remove('playing')}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.addEventListener('click',e=>{if(e.target.closest('button,a'))return;const heart=document.createElement('div');heart.className='corazon-click';heart.style.left=`${e.clientX-10}px`;heart.style.top=`${e.clientY-10}px`;document.body.appendChild(heart);setTimeout(()=>heart.remove(),900)});
updateContent();
