
const PRODUCTS = [
  {
    id: 1,
    name: "هدفون بی‌سیم مدل X1",
    cat: "دیجیتال",
    price: 1450000,
    old: 1790000,
    img: "./images/img01.webp",
    d: "بلوتوث ۵٫۳، تا ۳۰ ساعت شارژدهی و میکروفون با حذف نویز.",
  },
  {
    id: 2,
    name: "پاوربانک ۲۰۰۰۰ میلی‌آمپر",
    cat: "دیجیتال",
    price: 980000,
    old: 0,
    img: "./images/img02.webp",
    d: "شارژ سریع ۲۲٫۵ وات با دو خروجی USB و یک ورودی Type-C.",
  },
  {
    id: 3,
    name: "ساعت هوشمند سری S",
    cat: "دیجیتال",
    price: 2350000,
    old: 2790000,
    img: "./images/img03.webp",
    d: "نمایشگر AMOLED، پایش ضربان قلب و خواب، ضدآب.",
  },
  {
    id: 4,
    name: "ست قابلمه ۶ تکه",
    cat: "خانه",
    price: 3200000,
    old: 0,
    img: "./images/img04.webp",
    d: "آلومینیوم با پوشش نچسب، مناسب انواع اجاق.",
  },
  {
    id: 5,
    name: "لیوان دبل‌وال استیل",
    cat: "خانه",
    price: 420000,
    old: 520000,
    img: "./images/img05.webp",
    d: "نگهداری دما تا ۶ ساعت، ظرفیت ۴۰۰ میلی‌لیتر.",
  },
  {
    id: 6,
    name: "چراغ مطالعه رومیزی",
    cat: "خانه",
    price: 650000,
    old: 0,
    img: "./images/img06.webp",
    d: "سه حالت نور و روشنایی قابل تنظیم، شارژی.",
  },
  {
    id: 7,
    name: "کوله‌پشتی ضدآب",
    cat: "مد و اکسسوری",
    price: 1180000,
    old: 1380000,
    img: "./images/img07.jpeg",
    d: "جای لپ‌تاپ ۱۵ اینچ، پارچه ضدآب و بند طبی.",
  },
  {
    id: 8,
    name: "کیف پول چرم طبیعی",
    cat: "مد و اکسسوری",
    price: 760000,
    old: 0,
    img: "./images/img08.webp",
    d: "چرم طبیعی با ۸ جای کارت و دوخت مقاوم.",
  },
];
const FREE = 1500000,
  SHIP = 65000;
const fa = (n) => Number(n).toLocaleString("fa-IR");
const $ = (s) => document.querySelector(s);
const ld = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) || d;
  } catch (e) {
    return d;
  }
};
const sv = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};
let cat = "همه",
  term = "",
  sort = "d",
  cart = ld("gb_cart", {}),
  fav = ld("gb_fav", {});
const cats = ["همه", ...new Set(PRODUCTS.map((p) => p.cat))];
const pOf = (id) => PRODUCTS.find((x) => x.id == id);
const off = (p) => (p.old ? Math.round((1 - p.price / p.old) * 100) : 0);
const imgBox = (p) =>
  `<div class="img" data-v="${p.id}">${off(p) ? `<span class="off">${fa(off(p))}٪ تخفیف</span>` : ""}${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : "تصویر محصول"}</div>`;
function tabs() {
  $("#tabs").innerHTML = cats
    .map(
      (c) =>
        `<button class="tab" aria-pressed="${c === cat}" data-c="${c}">${c}</button>`,
    )
    .join("");
}
function grid() {
  let l = PRODUCTS.filter(
    (p) => (cat === "همه" || p.cat === cat) && p.name.includes(term.trim()),
  );
  if (sort == "a") l.sort((a, b) => a.price - b.price);
  if (sort == "z") l.sort((a, b) => b.price - a.price);
  if (sort == "o") l.sort((a, b) => off(b) - off(a));
  $("#grid").innerHTML = l.length
    ? l
        .map(
          (
            p,
          ) => `<article class="card"><div style="position:relative"><button class="hb" data-f="${p.id}" aria-label="علاقه‌مندی" aria-pressed="${!!fav[p.id]}">${fav[p.id] ? "♥" : "♡"}</button>${imgBox(p)}</div>
  <div class="info"><span class="cat">${p.cat}</span><h3 data-v="${p.id}">${p.name}</h3>
  <div class="price">${p.old ? `<del>${fa(p.old)}</del>` : ""}<b>${fa(p.price)}</b> <small>تومان</small></div>
  <button class="add" data-id="${p.id}">افزودن به سبد</button></div></article>`,
        )
        .join("")
    : '<div class="empty" style="grid-column:1/-1">محصولی پیدا نشد. عبارت دیگری را جستجو کنید.</div>';
}
const sum = () =>
  Object.keys(cart).reduce((s, id) => s + pOf(id).price * cart[id], 0);
function render() {
  const ids = Object.keys(cart);
  let n = 0;
  const t = sum();
  ids.forEach((id) => (n += cart[id]));
  const left = Math.max(0, FREE - t);
  $("#items").innerHTML = ids.length
    ? `<div class="ship">${left ? `${fa(left)} تومان دیگر تا ارسال رایگان` : "ارسال شما رایگان است 🎉"}<div class="pbar"><i style="width:${Math.min(100, (t / FREE) * 100)}%"></i></div></div>` +
      ids
        .map((id) => {
          const p = pOf(id),
            q = cart[id];
          return `<div class="row"><div>${p.name}<br><small>${fa(p.price * q)} تومان</small></div><div class="qty"><button data-m="${id}" aria-label="کم">−</button>${fa(q)}<button data-p="${id}" aria-label="زیاد">+</button></div></div>`;
        })
        .join("")
    : '<div class="empty">سبد خرید شما خالی است. از بین محصولات انتخاب کنید.</div>';
  $("#count").textContent = fa(n);
  $("#total").textContent = fa(t) + " تومان";
  sv("gb_cart", cart);
}
function add(id, q = 1) {
  cart[id] = (cart[id] || 0) + q;
  render();
  toast("به سبد خرید اضافه شد");
}
function drawer(on) {
  $("#drawer").classList.toggle("on", on);
  $("#ov").classList.toggle("on", on);
}
function toast(t) {
  const e = $("#toast");
  e.textContent = t;
  e.classList.add("on");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => e.classList.remove("on"), 1800);
}
function modal(id, on) {
  $(id).classList.toggle("on", on);
}
function detail(id) {
  const p = pOf(id);
  $("#pdc").innerHTML =
    imgBox(p).replace(' data-v="' + id + '"', "") +
    `<div class="t"><span class="cat">${p.cat}</span><h3>${p.name}</h3><p style="color:var(--mute);margin:0">${p.d}</p>
 <div class="price">${p.old ? `<del>${fa(p.old)}</del>` : ""}<b>${fa(p.price)}</b> <small>تومان</small></div>
 <button class="btn" data-id="${p.id}" data-close>افزودن به سبد</button></div>`;
  modal("#pm", true);
}
function checkout() {
  if (!Object.keys(cart).length) return toast("ابتدا محصولی اضافه کنید");
  const t = sum(),
    s = t >= FREE ? 0 : SHIP;
  drawer(false);
  $("#cmc").innerHTML =
    `<form class="f" id="of" novalidate><h3 style="margin:0">اطلاعات ارسال</h3>
 <label>نام و نام خانوادگی<input name="name" autocomplete="name"><span class="er"></span></label>
 <label>شماره موبایل<input name="phone" inputmode="numeric" autocomplete="tel" placeholder="09123456789"><span class="er"></span></label>
 <label>شهر<input name="city" autocomplete="address-level2"><span class="er"></span></label>
 <label>آدرس کامل<textarea name="addr" rows="3" autocomplete="street-address"></textarea><span class="er"></span></label>
 <div class="ship">کالاها: ${fa(t)} تومان · ارسال: ${s ? fa(s) + " تومان" : "رایگان"}<br><b style="color:var(--ink);font-size:15px">مبلغ قابل پرداخت: ${fa(t + s)} تومان</b></div>
 <button class="btn" type="submit">ثبت سفارش</button></form>`;
  modal("#cm", true);
}
const fa2en = (v) =>
  v
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
function submitOrder(data) {
  /* TODO: اتصال به API بک‌اند — فعلاً فقط شبیه‌سازی */ return Promise.resolve({
    code: "GB-" + Math.floor(100000 + Math.random() * 900000),
  });
}
document.addEventListener("submit", async (e) => {
  if (e.target.id !== "of") return;
  e.preventDefault();
  const f = e.target,
    d = Object.fromEntries(new FormData(f));
  d.phone = fa2en(d.phone || "");
  let ok = true;
  const rules = {
    name: (v) => v.trim().length >= 3 || "نام را کامل وارد کنید",
    phone: (v) =>
      /^09\d{9}$/.test(v) || "شماره موبایل معتبر نیست (مثال: 09123456789)",
    city: (v) => v.trim() || "شهر را وارد کنید",
    addr: (v) => v.trim().length >= 10 || "آدرس را کامل‌تر بنویسید",
  };
  for (const k in rules) {
    const el = f.elements[k],
      r = rules[k](d[k] || "");
    el.setAttribute("aria-invalid", r !== true);
    el.nextElementSibling.textContent = r === true ? "" : r;
    if (r !== true) ok = false;
  }
  if (!ok) return;
  const r = await submitOrder({ ...d, items: cart });
  cart = {};
  render();
  $("#cmc").innerHTML =
    `<div class="f" style="text-align:center"><h3 style="color:var(--red);margin:0">سفارش شما ثبت شد ✔</h3><p style="margin:0">کد پیگیری: <b>${r.code}</b><br>همکاران ما به‌زودی برای تأیید با شما تماس می‌گیرند.</p><button class="btn" data-x>بازگشت به فروشگاه</button></div>`;
});
document.addEventListener("click", (e) => {
  const t = e.target,
    g = (a) => t.closest("[" + a + "]")?.getAttribute(a);
  if (g("data-c")) {
    cat = g("data-c");
    tabs();
    grid();
  } else if (g("data-f")) {
    const id = g("data-f");
    fav[id] ? delete fav[id] : (fav[id] = 1);
    sv("gb_fav", fav);
    grid();
  } else if (g("data-v")) {
    detail(g("data-v"));
  } else if (g("data-id")) {
    add(g("data-id"));
    if (t.closest("[data-close]")) modal("#pm", false);
  } else if (g("data-p")) {
    cart[g("data-p")]++;
    render();
  } else if (g("data-m")) {
    const m = g("data-m");
    if (!--cart[m]) delete cart[m];
    render();
  }
  if (t.closest("[data-x]") || t.classList.contains("modal")) {
    modal("#pm", false);
    modal("#cm", false);
  }
  if (t.closest("#nav a")) $("#nav").classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal("#pm", false);
    modal("#cm", false);
    drawer(false);
  }
});
$("#q").oninput = (e) => {
  term = e.target.value;
  grid();
};
$("#sort").onchange = (e) => {
  sort = e.target.value;
  grid();
};
$("#menu").onclick = (e) => {
  const o = $("#nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", o);
};
$("#open").onclick = () => drawer(true);
$("#close").onclick = () => drawer(false);
$("#ov").onclick = () => drawer(false);
$("#checkout").onclick = checkout;
Object.keys(cart).forEach((id) => {
  if (!pOf(id)) delete cart[id];
});
tabs();
grid();
render();
