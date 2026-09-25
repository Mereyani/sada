"use strict";

const I18N = {
  en: {
    tagline: "Private speech-to-text that runs on your computer",
    local: "100% offline", source: "Source", tabLink: "Link", tabFile: "File",
    linkPh: "Paste a YouTube, TikTok, Instagram, X… link", paste: "Paste",
    linkHint: "Works with 1,000+ sites. Only the audio is downloaded.",
    dropTitle: "Drop a video or audio file", dropSub: "or click to browse · MP4, MKV, MOV, MP3, WAV, M4A, OGG…",
    model: "Model", recommended: "Recommended", ready: "Downloaded", heavy: "Heavy for this PC",
    oneTime: "{size} · one-time download", accuracy: "Accuracy", speed: "Speed",
    ramGB: "{ram} GB RAM", ramUnknown: "RAM unknown", threadsN: "{n} CPU threads", runsOn: "runs on {hw}", gpu: "NVIDIA GPU", cpu: "CPU",
    stop: "Stop", stopping: "Stopping…", fetch: "Downloading model",
    storage: "Models on this computer · {size}", storageHint: "Delete a model to free space. It downloads again if you use it later.",
    del: "Delete", confirmDel: "Confirm", partial: "incomplete", deleted: "Model deleted", inUse: "This model is in use right now",
    "m.tiny": "Fastest — weak devices and quick drafts",
    "m.base": "Light and quick, fair accuracy",
    "m.small": "Balanced — great for most laptops",
    "m.large-v3-turbo": "Near-best accuracy, ~6× faster than Large",
    "m.large-v3": "Maximum accuracy, slowest",
    spoken: "Spoken language", auto: "Auto-detect",
    history: "Recent transcripts", historyHint: "Saved on this computer. Open one to read, edit or export it.",
    back: "All transcripts", edit: "Edit", doneEdit: "Done editing", editHint: "Click any line to fix a word. Changes save automatically.",
    searchPh: "Search the transcript", matches: { one: "1 match", other: "{n} matches" }, noMatch: "Not found", saveFail: "Couldn't save the edit",
    start: "Start transcription", cancel: "Cancel", new: "New transcription",
    emptyTitle: "Your transcript will appear here",
    emptyBody: "Add a link or a file, choose a model and press start.",
    f1: "Nothing leaves your computer — no API, no account",
    f2: "99 languages with automatic language detection",
    f3: "Export as TXT, SRT, VTT subtitles or JSON",
    queued: "Waiting for the previous job…", download: "Downloading audio", load: "Loading model",
    loadFirst: "Downloading the model · {size} (first time only)…", transcribing: "Transcribing",
    done: "Done", cancelled: "Cancelled", failed: "Failed",
    detected: "{lang} · {pct}%", segments: { one: "1 segment", other: "{n} segments" }, words: { one: "1 word", other: "{n} words" },
    timestamps: "Timestamps", copy: "Copy", copied: "Copied to clipboard", saved: "Saved",
    errUrl: "Please enter a valid link (https://…)", errFile: "Please choose a file first",
    errServer: "The local engine is not responding",
    theme: "Theme",
  },
  ar: {
    tagline: "تفريغ الصوت إلى نص بخصوصية تامة على جهازك",
    local: "بدون إنترنت 100%", source: "المصدر", tabLink: "رابط", tabFile: "ملف",
    linkPh: "الصق رابطاً من يوتيوب، تيك توك، إنستغرام، إكس…", paste: "لصق",
    linkHint: "يدعم أكثر من 1000 موقع، ويُحمَّل الصوت فقط.",
    dropTitle: "اسحب ملف فيديو أو صوت إلى هنا", dropSub: "أو انقر للاختيار · MP4, MKV, MOV, MP3, WAV, M4A, OGG…",
    model: "النموذج", recommended: "موصى به", ready: "مُنزَّل", heavy: "ثقيل على هذا الجهاز",
    oneTime: "{size} · تنزيل لمرة واحدة", accuracy: "الدقة", speed: "السرعة",
    ramGB: "ذاكرة {ram} GB", ramUnknown: "الذاكرة غير معروفة", threadsN: "{n} خيط معالجة", runsOn: "يعمل على {hw}", gpu: "بطاقة NVIDIA", cpu: "المعالج",
    stop: "إيقاف", stopping: "جارٍ الإيقاف…", fetch: "تنزيل النموذج",
    storage: "النماذج على جهازك · {size}", storageHint: "احذف نموذجاً لتوفير المساحة، ويُنزَّل من جديد إن استخدمته لاحقاً.",
    del: "حذف", confirmDel: "تأكيد", partial: "غير مكتمل", deleted: "حُذف النموذج", inUse: "هذا النموذج قيد الاستخدام الآن",
    "m.tiny": "الأسرع — للأجهزة الضعيفة والمسودات السريعة",
    "m.base": "خفيف وسريع بدقة مقبولة",
    "m.small": "متوازن — ممتاز لمعظم الحواسيب",
    "m.large-v3-turbo": "دقة شبه قصوى وأسرع بـ 6 مرات من Large",
    "m.large-v3": "أعلى دقة ممكنة، والأبطأ",
    spoken: "لغة الكلام", auto: "كشف تلقائي",
    history: "آخر التفريغات", historyHint: "محفوظة على جهازك. افتح أياً منها لقراءته أو تعديله أو تصديره.",
    back: "كل التفريغات", edit: "تعديل", doneEdit: "إنهاء التعديل", editHint: "انقر أي سطر لتصحيح كلمة. تُحفظ التعديلات تلقائياً.",
    searchPh: "ابحث في النص", matches: { one: "نتيجة واحدة", two: "نتيجتان", few: "{n} نتائج", many: "{n} نتيجة", other: "{n} نتيجة" }, noMatch: "لا نتائج", saveFail: "تعذّر حفظ التعديل",
    start: "ابدأ التفريغ", cancel: "إلغاء", new: "تفريغ جديد",
    emptyTitle: "سيظهر النص المُفرَّغ هنا",
    emptyBody: "أضف رابطاً أو ملفاً، اختر النموذج، ثم اضغط ابدأ.",
    f1: "لا شيء يغادر جهازك — بلا API وبلا حساب",
    f2: "99 لغة مع كشف تلقائي للغة",
    f3: "تصدير بصيغة TXT أو ترجمات SRT و VTT أو JSON",
    queued: "بانتظار انتهاء المهمة السابقة…", download: "تحميل الصوت", load: "تحميل النموذج",
    loadFirst: "تنزيل النموذج · {size} (للمرة الأولى فقط)…", transcribing: "التفريغ",
    done: "اكتمل", cancelled: "أُلغي", failed: "فشل",
    detected: "{lang} · {pct}%", segments: { one: "مقطع واحد", two: "مقطعان", few: "{n} مقاطع", many: "{n} مقطعاً", other: "{n} مقطع" },
    words: { one: "كلمة واحدة", two: "كلمتان", few: "{n} كلمات", many: "{n} كلمة", other: "{n} كلمة" },
    timestamps: "التوقيت", copy: "نسخ", copied: "تم النسخ", saved: "تم الحفظ",
    errUrl: "أدخل رابطاً صحيحاً (https://…)", errFile: "اختر ملفاً أولاً",
    errServer: "المحرك المحلي لا يستجيب",
    theme: "المظهر",
  },
  tr: {
    tagline: "Bilgisayarınızda çalışan gizli konuşmadan metne",
    local: "%100 çevrimdışı", source: "Kaynak", tabLink: "Bağlantı", tabFile: "Dosya",
    linkPh: "YouTube, TikTok, Instagram, X… bağlantısı yapıştırın", paste: "Yapıştır",
    linkHint: "1.000+ siteyle çalışır. Yalnızca ses indirilir.",
    dropTitle: "Video veya ses dosyası bırakın", dropSub: "ya da seçmek için tıklayın · MP4, MKV, MOV, MP3, WAV, M4A, OGG…",
    model: "Model", recommended: "Önerilen", ready: "İndirildi", heavy: "Bu cihaz için ağır",
    oneTime: "{size} · tek seferlik indirme", accuracy: "Doğruluk", speed: "Hız",
    ramGB: "{ram} GB RAM", ramUnknown: "RAM bilinmiyor", threadsN: "{n} iş parçacığı", runsOn: "{hw} üzerinde", gpu: "NVIDIA GPU", cpu: "CPU",
    stop: "Durdur", stopping: "Durduruluyor…", fetch: "Model indiriliyor",
    storage: "Bu bilgisayardaki modeller · {size}", storageHint: "Yer açmak için bir modeli silin. Tekrar kullanırsanız yeniden indirilir.",
    del: "Sil", confirmDel: "Onayla", partial: "yarım", deleted: "Model silindi", inUse: "Bu model şu anda kullanılıyor",
    "m.tiny": "En hızlı — zayıf cihazlar ve hızlı taslaklar",
    "m.base": "Hafif ve hızlı, makul doğruluk",
    "m.small": "Dengeli — çoğu dizüstü için ideal",
    "m.large-v3-turbo": "En iyiye yakın doğruluk, Large'dan ~6× hızlı",
    "m.large-v3": "En yüksek doğruluk, en yavaş",
    spoken: "Konuşma dili", auto: "Otomatik algıla",
    history: "Son dökümler", historyHint: "Bu bilgisayarda kayıtlı. Okumak, düzenlemek veya dışa aktarmak için birini açın.",
    back: "Tüm dökümler", edit: "Düzenle", doneEdit: "Düzenlemeyi bitir", editHint: "Bir kelimeyi düzeltmek için herhangi bir satıra tıklayın. Değişiklikler otomatik kaydedilir.",
    searchPh: "Metinde ara", matches: "{n} sonuç", noMatch: "Sonuç yok", saveFail: "Düzenleme kaydedilemedi",
    start: "Yazıya dökmeyi başlat", cancel: "İptal", new: "Yeni döküm",
    emptyTitle: "Metniniz burada görünecek",
    emptyBody: "Bir bağlantı veya dosya ekleyin, model seçin ve başlatın.",
    f1: "Hiçbir şey bilgisayarınızdan çıkmaz — API yok, hesap yok",
    f2: "Otomatik dil algılamalı 99 dil",
    f3: "TXT, SRT, VTT altyazı veya JSON olarak dışa aktarın",
    queued: "Önceki işin bitmesi bekleniyor…", download: "Ses indiriliyor", load: "Model yükleniyor",
    loadFirst: "Model indiriliyor · {size} (yalnızca ilk sefer)…", transcribing: "Yazıya dökülüyor",
    done: "Tamamlandı", cancelled: "İptal edildi", failed: "Başarısız",
    detected: "{lang} · %{pct}", segments: "{n} bölüm", words: "{n} kelime",
    timestamps: "Zaman damgaları", copy: "Kopyala", copied: "Panoya kopyalandı", saved: "Kaydedildi",
    errUrl: "Geçerli bir bağlantı girin (https://…)", errFile: "Önce bir dosya seçin",
    errServer: "Yerel motor yanıt vermiyor",
    theme: "Tema",
  },
};
const MODEL_NAMES = { tiny: "Tiny", base: "Base", small: "Small", "large-v3-turbo": "Large v3 Turbo", "large-v3": "Large v3" };

const $ = (id) => document.getElementById(id);
// Preferences are saved by the local engine (settings.json in the app data folder), so they
// survive restarts even though the window's own storage doesn't.
const prefs = {};
const store = {
  get(k) { return prefs[k] ?? null; },
  set(k, v) {
    prefs[k] = v;
    api("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [k]: v }) }).catch(() => {});
  },
};
const state = { lang: "en", info: null, model: null, tab: "link", file: null, job: null, segs: [], timer: null, busy: false,
  history: null, editing: false, hit: -1, saveTimer: null };

function t(key, vars = {}) {
  const s = I18N[state.lang][key] ?? I18N.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
// Counted nouns: Arabic has separate forms for 1, 2, 3–10 and 11–99; Intl.PluralRules picks the category.
function tn(key, n) {
  const f = I18N[state.lang][key] ?? I18N.en[key];
  const s = typeof f === "string" ? f : f[new Intl.PluralRules(state.lang).select(n)] ?? f.other;
  return s.replace("{n}", n.toLocaleString(state.lang === "ar" ? "en" : state.lang));
}
function langName(code) {
  try { return new Intl.DisplayNames([state.lang], { type: "language" }).of(code === "jw" ? "jv" : code) || code; }
  catch { return code; }
}
function fmtTime(sec, sep = ".", hours = false) {
  const ms = Math.round(sec * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  if (sep === null) return (h ? `${h}:${pad(m)}` : `${m}`) + `:${pad(s)}`;
  return `${hours || h ? pad(h) + ":" : ""}${pad(m)}:${pad(s)}${sep}${pad(ms % 1000, 3)}`;
}
const esc = (x) => String(x ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
function fmtDate(iso) {
  try { return new Intl.DateTimeFormat(state.lang, { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso)); }
  catch { return iso; }
}
function fmtSize(mb) { return mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : `${mb} MB`; }
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  document.body.append(el);
  setTimeout(() => el.remove(), 1800);
}

async function api(path, opts = {}) {
  const res = await fetch(path, { ...opts, headers: { "X-Sada": "1", ...(opts.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

/* ---------------- i18n + theme ---------------- */

function applyLang(lang) {
  state.lang = I18N[lang] ? lang : "en";
  store.set("sada.lang", state.lang);
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nLabel)));
  document.querySelectorAll("#uiLang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === state.lang));
  $("themeBtn").setAttribute("aria-label", t("theme"));
  if (state.info) { renderDevice(); renderModels(); renderLanguages(); }
  renderStartBtn();
  if (state.job) renderJob(state.job);
  if (state.history) renderHistory();
  if (state.editing) $("editBtn").textContent = t("doneEdit");
}

function applyTheme(theme) {
  if (theme) document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
}
$("themeBtn").onclick = () => {
  const dark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  applyTheme(next); store.set("sada.theme", next);
};
document.querySelectorAll("#uiLang button").forEach((b) => { b.onclick = () => applyLang(b.dataset.lang); });

/* ---------------- settings panel ---------------- */

function renderDevice() {
  const i = state.info;
  $("device").textContent = [
    i.ram_gb ? t("ramGB", { ram: Math.round(i.ram_gb) }) : t("ramUnknown"),
    i.threads ? t("threadsN", { n: i.threads }) : "",
    t("runsOn", { hw: i.gpu ? t("gpu") : t("cpu") }),
  ].filter(Boolean).join(" · ");
}

function meter(label, n, cls) {
  return `<span class="meter ${cls}"><b>${label}</b><span class="sr">${n}/5</span>${[1, 2, 3, 4, 5].map((k) => `<i aria-hidden="true" class="${k <= n ? "on" : ""}"></i>`).join("")}</span>`;
}

function renderModels() {
  const i = state.info;
  const heavy = (m) => !i.gpu && i.ram_gb && m.ram_gb * 2 > i.ram_gb;
  // Native <select>: keyboard, screen readers and the OS look come for free. Each option
  // carries the facts needed to choose; the line below it details the selected model.
  // ✓ = downloaded (spelled out in the badge under the list); kept short so it never truncates
  $("model").innerHTML = i.models.map((m) => `<option value="${m.id}">${[
    `${MODEL_NAMES[m.id]} — ${fmtSize(m.size_mb)}${m.cached ? " ✓" : ""}`,
    m.id === i.recommended ? t("recommended") : "",
    heavy(m) ? t("heavy") : "",
  ].filter(Boolean).join(" · ")}</option>`).join("");
  $("model").value = state.model;
  const m = i.models.find((x) => x.id === state.model);
  $("modelInfo").innerHTML = `<p>${t("m." + m.id)}</p>
    <div class="model-meta">${meter(t("accuracy"), m.quality, "")}${meter(t("speed"), m.speed, "speed")}
      ${m.cached ? `<span class="badge ok">${t("ready")}</span>` : `<span>${t("oneTime", { size: fmtSize(m.size_mb) })}</span>`}
      ${heavy(m) ? `<span class="badge warn">${t("heavy")}</span>` : ""}</div>`;
  renderStorage();
}
$("model").onchange = (e) => { state.model = e.target.value; store.set("sada.model", state.model); renderModels(); };

function renderStorage() {
  const onDisk = state.info.models.filter((m) => m.disk_mb > 0);
  $("storage").hidden = !onDisk.length;
  $("storageSum").textContent = t("storage", { size: fmtSize(onDisk.reduce((n, m) => n + m.disk_mb, 0)) });
  $("storageList").innerHTML = onDisk.map((m) => `<li>
      <span>${MODEL_NAMES[m.id]}${m.cached ? "" : ` <em>(${t("partial")})</em>`}</span>
      <span class="size" dir="ltr">${fmtSize(m.disk_mb)}</span>
      <button class="ghost del" data-id="${m.id}" ${state.busy ? "disabled" : ""}>${t("del")}</button>
    </li>`).join("");
  $("storageList").querySelectorAll(".del").forEach((b) => {
    b.onclick = async () => {
      if (!b.classList.contains("armed")) {  // two-step: first click arms, second deletes
        b.classList.add("armed"); b.textContent = t("confirmDel");
        setTimeout(() => { b.classList.remove("armed"); b.textContent = t("del"); }, 3000);
        return;
      }
      try {
        await api(`/api/models/${b.dataset.id}/delete`, { method: "POST" });
        toast(t("deleted"));
      } catch { toast(t("inUse")); }
      loadInfo();
    };
  });
}

// While a job runs every setting is locked; the pinned button becomes Stop.
function setBusy(busy) {
  state.busy = busy;
  document.querySelector(".side").classList.toggle("busy", busy);
  document.querySelectorAll(".side input, .side select, .side button:not(#startBtn)").forEach((el) => { el.disabled = busy; });
  renderStartBtn();
}

const ICON_MIC = '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm7 9a7 7 0 0 1-14 0m7 7v2"/>';
const ICON_STOP = '<rect x="6" y="6" width="12" height="12" rx="2"/>';
function renderStartBtn() {
  const b = $("startBtn"), stopping = state.busy && state.job?.stopping;
  b.classList.toggle("danger", state.busy);
  b.disabled = Boolean(stopping) || (state.busy && !state.job);
  b.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${state.busy ? ICON_STOP : ICON_MIC}</svg><span>${
    state.busy ? (stopping ? t("stopping") : t("stop")) : t("start")}</span>`;
}

async function stop() {
  if (!state.job) return;
  state.job.stopping = true; renderStartBtn();
  await api(`/api/jobs/${state.job.id}/cancel`, { method: "POST" }).catch(() => {});
}

function renderLanguages() {
  const sel = $("language"), cur = sel.value;
  const opts = state.info.languages.map((c) => [c, langName(c)]).sort((a, b) => a[1].localeCompare(b[1], state.lang));
  sel.innerHTML = `<option value="">${t("auto")}</option>` + opts.map(([c, n]) => `<option value="${c}">${n}</option>`).join("");
  sel.value = cur;
}

document.querySelectorAll(".tabs button").forEach((b) => {
  b.onclick = () => {
    state.tab = b.dataset.tab;
    document.querySelectorAll(".tabs button").forEach((x) => x.setAttribute("aria-selected", x === b));
    $("tab-link").hidden = state.tab !== "link";
    $("tab-file").hidden = state.tab !== "file";
    showFormError("");
  };
});

$("pasteBtn").onclick = async () => {
  try { $("url").value = (await navigator.clipboard.readText()).trim(); } catch { $("url").focus(); }
};
$("url").addEventListener("keydown", (e) => { if (e.key === "Enter" && !state.busy) start(); });

function setFile(f) {
  state.file = f || null;
  $("fileName").textContent = f ? `${f.name} · ${fmtSize(Math.max(1, Math.round(f.size / 1e6)))}` : "";
  showFormError("");
}
$("file").onchange = (e) => setFile(e.target.files[0]);
const drop = $("drop");
["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", (e) => { if (!state.busy) setFile(e.dataTransfer.files[0]); });
// a file dropped anywhere in the window goes to the file tab
window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => {
  e.preventDefault();
  if (state.busy || e.target.closest("#drop") || !e.dataTransfer.files[0]) return;
  document.querySelector('.tabs [data-tab="file"]').click();
  setFile(e.dataTransfer.files[0]);
});

function showFormError(msg) { $("formError").hidden = !msg; $("formError").textContent = msg; }

/* ---------------- jobs ---------------- */

async function start() {
  const opts = { model: state.model, language: $("language").value };
  let job;
  try {
    if (state.tab === "link") {
      const url = $("url").value.trim();
      if (!/^https?:\/\/\S+$/i.test(url)) return showFormError(t("errUrl"));
      setBusy(true);
      job = await api("/api/jobs/url", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, ...opts }) });
    } else {
      if (!state.file) return showFormError(t("errFile"));
      setBusy(true);
      const q = new URLSearchParams({ name: state.file.name, ...opts });
      job = await api(`/api/jobs/file?${q}`, { method: "POST", headers: { "Content-Type": "application/octet-stream" }, body: state.file });
    }
  } catch (e) {
    setBusy(false);
    return showFormError(e.message || t("errServer"));
  }
  showFormError("");
  showJob(job, []);
  renderStartBtn();
  poll();
}
$("startBtn").onclick = () => (state.busy ? stop() : start());

async function poll() {
  clearTimeout(state.timer);
  const id = state.job?.id;
  if (!id) return;
  try {
    const job = await api(`/api/jobs/${id}?since=${state.segs.length}`);
    if (state.job?.id !== id) return;
    appendSegments(job.segments);
    state.job = job;
    renderJob(job);
    if (["queued", "running"].includes(job.status)) state.timer = setTimeout(poll, 600);
    else { setBusy(false); loadInfo(); loadHistory(); }
  } catch {
    state.timer = setTimeout(poll, 1500);
  }
}

function renderJob(job) {
  const running = ["queued", "running"].includes(job.status);
  $("jobTitle").textContent = job.title || "";
  $("newBtn").hidden = running;
  $("newBtn").textContent = job.history ? t("back") : t("new");

  const m = state.info?.models.find((x) => x.id === job.model);
  const steps = [...(job.url ? [["download", t("download")]] : []), ...(job.fetch ? [["fetch", t("fetch")]] : []),
    ["model", t("load")], ["transcribe", t("transcribing")]];
  const order = ["queued", ...steps.map((s) => s[0]), "done"];
  const cur = order.indexOf(job.stage);
  $("steps").innerHTML = steps.map(([k, label]) => {
    const i = order.indexOf(k);
    const cls = job.stage === "done" || i < cur ? "done" : i === cur && running ? "active" : "";
    return `<li class="${cls}">${label}</li>`;
  }).join("");

  const stageText = {
    queued: t("queued"), download: t("download"), fetch: t("loadFirst", { size: fmtSize(m?.size_mb || 0) }), model: t("load"),
    transcribe: t("transcribing"), done: t("done"),
  }[job.stage];
  const statusText = { cancelled: t("cancelled"), error: t("failed") }[job.status];
  $("stageText").textContent = statusText || (job.stopping ? t("stopping") : stageText) || "";
  const indet = running && (job.stage === "model" || job.stage === "queued" || (["download", "fetch"].includes(job.stage) && !job.progress));
  $("progress").querySelector(".bar").classList.toggle("indet", indet);
  $("barFill").style.width = `${Math.round((job.progress || 0) * 100)}%`;
  $("pct").textContent = running && !indet ? `${Math.round(job.progress * 100)}%` : "";
  $("progress").hidden = job.status === "done";

  $("jobError").hidden = job.status !== "error";
  $("jobError").textContent = job.error || "";

  const words = state.segs.reduce((n, s) => n + s.text.split(/\s+/).filter(Boolean).length, 0);
  const chips = [
    job.language ? `<span class="chip hl">${t("detected", { lang: langName(job.language), pct: Math.round((job.language_prob || 0) * 100) })}</span>` : "",
    job.duration ? `<span class="chip" dir="ltr">${fmtTime(job.duration, null)}</span>` : "",
    `<span class="chip">${MODEL_NAMES[job.model]}</span>`,
    state.segs.length ? `<span class="chip">${tn("segments", state.segs.length)} · ${tn("words", words)}</span>` : "",
    job.created ? `<span class="chip">${esc(fmtDate(job.created))}</span>` : "",
    job.partial || job.status === "cancelled" ? `<span class="chip">${t("partial")}</span>` : "",
  ];
  $("chips").innerHTML = chips.join("");
  $("toolbar").hidden = !state.segs.length;
  $("editBtn").hidden = running;  // a finished (or stopped) transcript is saved, so it can be edited

  const typing = $("transcript").querySelector(".typing");
  if (running && job.stage === "transcribe" && !typing) $("transcript").insertAdjacentHTML("beforeend", '<div class="typing"><i></i><i></i><i></i></div>');
  if (!(running && job.stage === "transcribe") && typing) typing.remove();
  renderStartBtn();
}

function appendSegments(list) {
  if (!list.length) return;
  const box = $("transcript");
  const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
  const frag = document.createDocumentFragment();
  for (const s of list) {
    state.segs.push(s);
    const row = document.createElement("div");
    row.className = "seg-row";
    row.dataset.i = state.segs.length - 1;
    const time = document.createElement("time");
    time.textContent = fmtTime(s.start, null);
    const p = document.createElement("p");
    p.dir = "auto"; p.textContent = s.text;
    row.append(time, p);
    frag.append(row);
  }
  const typing = box.querySelector(".typing");
  box.insertBefore(frag, typing);
  if (nearBottom) box.scrollTop = box.scrollHeight;
}

function showJob(job, segs) {
  setEditing(false);
  $("search").value = ""; $("searchCount").textContent = "";
  state.job = job; state.segs = [];
  $("transcript").innerHTML = "";
  $("empty").hidden = true; $("job").hidden = false;
  appendSegments(segs);
  renderJob(job);
}

$("newBtn").onclick = () => {
  const fromHistory = state.job?.history;
  setEditing(false);
  state.job = null; state.segs = [];
  $("job").hidden = true; $("empty").hidden = false;
  if (!fromHistory) { $("url").value = ""; setFile(null); $("file").value = ""; }
  loadHistory();
};

/* ---------------- search ---------------- */

function applySearch() {
  const q = $("search").value.trim().toLowerCase();
  let n = 0;
  $("transcript").querySelectorAll(".seg-row").forEach((row) => {
    const p = row.querySelector("p"), text = state.segs[row.dataset.i].text;
    if (!q) { p.textContent = text; return; }
    // match on the raw text, then escape each piece, so markup in a transcript can never run
    const lower = text.toLowerCase();
    let html = "", from = 0, k;
    while (lower.length === text.length && (k = lower.indexOf(q, from)) !== -1) {
      html += esc(text.slice(from, k)) + `<mark>${esc(text.slice(k, k + q.length))}</mark>`;
      from = k + q.length; n++;
    }
    p.innerHTML = html + esc(text.slice(from));
  });
  state.hit = -1;
  $("searchCount").textContent = q ? (n ? tn("matches", n) : t("noMatch")) : "";
}
$("search").addEventListener("input", applySearch);
$("search").addEventListener("keydown", (e) => {  // Enter = next match, Shift+Enter = previous
  if (e.key !== "Enter") return;
  e.preventDefault();
  const marks = [...$("transcript").querySelectorAll("mark")];
  if (!marks.length) return;
  marks[state.hit]?.classList.remove("current");
  state.hit = (state.hit + (e.shiftKey ? -1 : 1) + marks.length) % marks.length;
  marks[state.hit].classList.add("current");
  marks[state.hit].scrollIntoView({ block: "center", behavior: "smooth" });
});

/* ---------------- edit ---------------- */

function setEditing(on) {
  state.editing = on;
  $("editBtn").setAttribute("aria-pressed", on);
  $("editBtn").textContent = on ? t("doneEdit") : t("edit");
  $("search").disabled = on;
  if (on) { $("search").value = ""; applySearch(); toast(t("editHint")); }
  $("transcript").classList.toggle("editing", on);
  $("transcript").querySelectorAll(".seg-row p").forEach((p) => {
    if (!on) { p.removeAttribute("contenteditable"); return; }
    try { p.contentEditable = "plaintext-only"; } catch { p.contentEditable = "true"; }
  });
}
$("editBtn").onclick = () => setEditing(!state.editing);
$("transcript").addEventListener("keydown", (e) => { if (state.editing && e.key === "Enter") e.preventDefault(); });
$("transcript").addEventListener("input", (e) => {
  const row = e.target.closest(".seg-row");
  if (!state.editing || !row) return;
  state.segs[row.dataset.i].text = e.target.textContent;
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(saveEdits, 600);
});
async function saveEdits() {
  const id = state.job?.id;
  try {
    await api(`/api/history/${id}`, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: state.segs.map((s) => s.text) }) });
    if (state.job?.id === id) renderJob(state.job);
  } catch { toast(t("saveFail")); }
}

/* ---------------- history ---------------- */

async function loadHistory() {
  try { state.history = await api("/api/history"); } catch { state.history = []; }
  renderHistory();
}

function renderHistory() {
  const list = state.history || [];
  $("intro").hidden = list.length > 0;
  $("history").hidden = !list.length;
  $("historyList").innerHTML = list.map((h) => `<li>
      <button class="h-open" data-id="${esc(h.id)}">
        <strong dir="auto">${esc(h.title)}</strong>
        <span class="h-meta">${[
          esc(fmtDate(h.created)),
          h.duration ? `<span dir="ltr">${fmtTime(h.duration, null)}</span>` : "",
          h.language ? esc(langName(h.language)) : "",
          tn("words", h.words),
          h.partial ? t("partial") : "",
        ].filter(Boolean).join(" · ")}</span>
        <span class="h-preview" dir="auto">${esc(h.preview)}</span>
      </button>
      <button class="ghost del" data-id="${esc(h.id)}">${t("del")}</button>
    </li>`).join("");
  $("historyList").querySelectorAll(".h-open").forEach((b) => { b.onclick = () => openHistory(b.dataset.id); });
  $("historyList").querySelectorAll(".del").forEach((b) => {
    b.onclick = async () => {
      if (!b.classList.contains("armed")) {  // two-step, like model delete
        b.classList.add("armed"); b.textContent = t("confirmDel");
        setTimeout(() => { b.classList.remove("armed"); b.textContent = t("del"); }, 3000);
        return;
      }
      await api(`/api/history/${b.dataset.id}/delete`, { method: "POST" }).catch(() => {});
      loadHistory();
    };
  });
}

async function openHistory(id) {
  const h = await api(`/api/history/${id}`);
  showJob({ ...h, url: h.source, status: "done", stage: "done", history: true }, h.segments);
}
$("tsToggle").onchange = (e) => $("transcript").classList.toggle("plain", !e.target.checked);

/* ---------------- export ---------------- */

function exportAs(fmt) {
  const segs = state.segs;
  if (fmt === "txt") return segs.map((s) => s.text).join("\n");
  if (fmt === "srt") return segs.map((s, i) => `${i + 1}\n${fmtTime(s.start, ",", true)} --> ${fmtTime(s.end, ",", true)}\n${s.text}\n`).join("\n");
  if (fmt === "vtt") return "WEBVTT\n\n" + segs.map((s) => `${fmtTime(s.start, ".", true)} --> ${fmtTime(s.end, ".", true)}\n${s.text}\n`).join("\n");
  const j = state.job;
  return JSON.stringify({ title: j.title, source: j.url, model: j.model, language: j.language,
    language_probability: j.language_prob, duration: j.duration, created: j.created, segments: segs }, null, 2);
}

async function save(fmt) {
  const content = exportAs(fmt);
  const base = (state.job.title || "transcript").replace(/\.[^.]+$/, "").replace(/[\\/:*?"<>|]+/g, "_").slice(0, 80);
  const name = `${base}.${fmt}`;
  if (window.pywebview?.api?.save) {
    if (await window.pywebview.api.save(name, content)) toast(t("saved"));
    return;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
document.querySelectorAll("[data-fmt]").forEach((b) => { b.onclick = () => save(b.dataset.fmt); });

$("copyBtn").onclick = async () => {
  const text = exportAs("txt");
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    document.body.append(ta); ta.select(); document.execCommand("copy"); ta.remove();
  }
  toast(t("copied"));
};

/* ---------------- boot ---------------- */

async function loadInfo() {
  try {
    state.info = await api("/api/info");
  } catch {
    return showFormError(t("errServer"));
  }
  const saved = store.get("sada.model");
  if (!state.model) state.model = state.info.models.some((m) => m.id === saved) ? saved : state.info.recommended;
  renderDevice(); renderModels(); renderLanguages();
}

(async () => {
  try { Object.assign(prefs, await api("/api/settings")); } catch { /* engine not up yet: defaults */ }
  applyTheme(store.get("sada.theme"));
  applyLang(store.get("sada.lang") || (navigator.language || "en").slice(0, 2));
  loadInfo();
  loadHistory();
})();
