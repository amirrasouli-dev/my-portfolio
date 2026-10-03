// عکس‌ها: مسیر هر تصویر را داخل شیء IMAGES بنویسید، مثال: hero:"images/hero.jpg"
const IMAGES={hero:"",about1:"",about2:"",g1:"",g2:"",g3:"",g4:"",g5:"",map:""};
const MENU={
 "قهوه گرم":[["اسپرسو","شات تکی با کرمای غلیظ",95000],["آمریکانو","اسپرسو و آب داغ",105000],["کاپوچینو","اسپرسو، شیر و فوم سبک",140000],["لاته","اسپرسو با شیر مخملی",150000],["فلت وایت بُن","دو شات اسپرسو با شیر",165000],["موکا","شکلات، اسپرسو و شیر",175000]],
 "قهوه سرد":[["آیس لاته","اسپرسو، شیر و یخ",160000],["کلد برو","دم‌آوری سرد ۱۸ ساعته",170000],["کلد برو نارنجی","با پوست پرتقال",185000],["اسپرسو تونیک","اسپرسو و تونیک خنک",180000]],
 "نوشیدنی‌ها":[["چای ماسالا","چای، شیر و ادویه",130000],["هات چاکلت","شکلات تلخ و خامه",155000],["دمنوش فصل","گیاهان تازه",120000],["لیموناد نعنا","تازه و خنک",125000]],
 "دسر و صبحانه":[["چیزکیک لوتوس","برش تکی",210000],["براونی گرم","با بستنی وانیلی",230000],["کروسان کره‌ای","پخت روزانه",140000],["صبحانه بُن","تخم‌مرغ، نان، پنیر و سبزی",290000]]
};
const fa=n=>Number(n).toLocaleString('fa-IR'),$=s=>document.querySelector(s);
let cat=Object.keys(MENU)[0];
function menu(){
 $('#tabs').innerHTML=Object.keys(MENU).map(c=>`<button class="tab" aria-pressed="${c===cat}" data-c="${c}">${c}</button>`).join('');
 $('#items').innerHTML=MENU[cat].map(i=>`<div class="it"><div class="r"><h3>${i[0]}</h3><span class="dots"></span><span class="p">${fa(i[2])} تومان</span></div><p>${i[1]}</p></div>`).join('');
}
$('#tabs').onclick=e=>{const c=e.target.dataset.c;if(c){cat=c;menu()}};
document.querySelectorAll('[data-img]').forEach(el=>{const s=IMAGES[el.dataset.img];if(s){el.textContent='';const i=new Image();i.src=s;i.alt='';i.loading='lazy';el.append(i)}});
const ts=$('select[name=time]');for(let h=8;h<=22;h++)['00','30'].forEach(m=>{const o=document.createElement('option');o.value=o.textContent=`${String(h).padStart(2,'0')}:${m}`.replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);ts.append(o)});
const d0=new Date().toISOString().slice(0,10);$('input[name=date]').min=d0;
const en=v=>v.replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
function submitReservation(d){/* TODO: اتصال به API بک‌اند */return Promise.resolve({code:'RB-'+Math.floor(1000+Math.random()*9000)})}
$('#rf').onsubmit=async e=>{
 e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));d.phone=en(d.phone||'');let ok=true;
 const R={name:v=>v.trim().length>=3||'نام را کامل بنویسید',phone:v=>/^09\d{9}$/.test(v)||'شماره موبایل معتبر نیست',date:v=>(v&&v>=d0)||'تاریخ را انتخاب کنید',time:v=>!!v||'ساعت را انتخاب کنید'};
 for(const k in R){const el=f.elements[k],r=R[k](d[k]||'');el.setAttribute('aria-invalid',r!==true);el.nextElementSibling.textContent=r===true?'':r;if(r!==true)ok=false}
 if(!ok)return;const r=await submitReservation(d);
 f.outerHTML=`<div class="ok" style="background:var(--foam);border-radius:22px"><h3>رزرو شما ثبت شد ✔</h3><p>کد رزرو: <b>${r.code}</b><br>برای تأیید با شما تماس می‌گیریم.</p></div>`};
$('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
$('#nav').onclick=e=>{if(e.target.tagName==='A')$('#nav').classList.remove('open')};
menu();
