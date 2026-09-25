"use strict";

const I18N = {
  en: {
    tagline: "Private speech-to-text that runs on your computer",
    local: "100% offline", source: "Source", tabLink: "Link", tabFile: "File",
    linkPh: "Paste a YouTube, TikTok, Instagram, X… link", paste: "Paste",
    linkHint: "Works with 1,000+ sites. Only the audio is downloaded.",
    dropTitle: "Drop a video or audio file", dropSub: "or click to browse · MP4, MKV, MOV, MP3, WAV, M4A, OGG…",
    model: "Model", recommended: "Recommended", ready: "Downloaded", heavy: "Heavy for this device",
    oneTime: "{size} · one-time download", accuracy: "Accuracy", speed: "Speed",
    device: "{ram} GB RAM · {cores} threads · {hw}", gpu: "NVIDIA GPU", cpu: "CPU",
    "m.tiny": "Fastest — weak devices and quick drafts",
    "m.base": "Light and quick, fair accuracy",
    "m.small": "Balanced — great for most laptops",
    "m.large-v3-turbo": "Near-best accuracy, ~6× faster than Large",
    "m.large-v3": "Maximum accuracy, slowest",
    spoken: "Spoken language", auto: "Auto-detect", output: "Output",
    transcribe: "Transcript (original language)", translate: "Translate to English",
    start: "Start transcription", cancel: "Cancel", new: "New transcription",
    emptyTitle: "Your transcript will appear here",
    emptyBody: "Add a link or a file, choose a model and press start.",
    f1: "Nothing leaves your computer — no API, no account",
    f2: "99 languages with automatic language detection",
    f3: "Export as TXT, SRT, VTT subtitles or JSON",
    queued: "Waiting for the previous job…", download: "Downloading audio", load: "Loading model",
    loadFirst: "Downloading the model · {size} (first time only)…", transcribing: "Transcribing",
    done: "Done", cancelled: "Cancelled", failed: "Failed",
    detected: "{lang} · {pct}%", segments: "{n} segments", words: "{n} words", segment1: "1 segment", word1: "1 word",
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
    device: "{ram} GB ذاكرة · {cores} أنوية · {hw}", gpu: "بطاقة NVIDIA", cpu: "المعالج",
    "m.tiny": "الأسرع — للأجهزة الضعيفة والمسودات السريعة",
    "m.base": "خفيف وسريع بدقة مقبولة",
    "m.small": "متوازن — ممتاز لمعظم الحواسيب",
    "m.large-v3-turbo": "دقة شبه قصوى وأسرع بـ 6 مرات من Large",
    "m.large-v3": "أعلى دقة ممكنة، والأبطأ",
    spoken: "لغة الكلام", auto: "كشف تلقائي", output: "الناتج",
    transcribe: "تفريغ (بلغة المقطع)", translate: "ترجمة إلى الإنجليزية",
    start: "ابدأ التفريغ", cancel: "إلغاء", new: "تفريغ جديد",
    emptyTitle: "سيظهر النص المُفرَّغ هنا",
    emptyBody: "أضف رابطاً أو ملفاً، اختر النموذج، ثم اضغط ابدأ.",
    f1: "لا شيء يغادر جهازك — بلا API وبلا حساب",
    f2: "99 لغة مع كشف تلقائي للغة",
    f3: "تصدير بصيغة TXT أو ترجمات SRT و VTT أو JSON",
    queued: "بانتظار انتهاء المهمة السابقة…", download: "تحميل الصوت", load: "تحميل النموذج",
    loadFirst: "تنزيل النموذج · {size} (للمرة الأولى فقط)…", transcribing: "التفريغ",
    done: "اكتمل", cancelled: "أُلغي", failed: "فشل",
    detected: "{lang} · {pct}%", segments: "{n} مقطع", words: "{n} كلمة", segment1: "مقطع واحد", word1: "كلمة واحدة",
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
    device: "{ram} GB RAM · {cores} iş parçacığı · {hw}", gpu: "NVIDIA GPU", cpu: "CPU",
    "m.tiny": "En hızlı — zayıf cihazlar ve hızlı taslaklar",
    "m.base": "Hafif ve hızlı, makul doğruluk",
    "m.small": "Dengeli — çoğu dizüstü için ideal",
    "m.large-v3-turbo": "En iyiye yakın doğruluk, Large'dan ~6× hızlı",
    "m.large-v3": "En yüksek doğruluk, en yavaş",
    spoken: "Konuşma dili", auto: "Otomatik algıla", output: "Çıktı",
    transcribe: "Metin (orijinal dil)", translate: "İngilizceye çevir",
    start: "Yazıya dökmeyi başlat", cancel: "İptal", new: "Yeni döküm",
    emptyTitle: "Metniniz burada görünecek",
    emptyBody: "Bir bağlantı veya dosya ekleyin, model seçin ve başlatın.",
    f1: "Hiçbir şey bilgisayarınızdan çıkmaz — API yok, hesap yok",
    f2: "Otomatik dil algılamalı 99 dil",
    f3: "TXT, SRT, VTT altyazı veya JSON olarak dışa aktarın",
    queued: "Önceki işin bitmesi bekleniyor…", download: "Ses indiriliyor", load: "Model yükleniyor",
    loadFirst: "Model indiriliyor · {size} (yalnızca ilk sefer)…", transcribing: "Yazıya dökülüyor",
    done: "Tamamlandı", cancelled: "İptal edildi", failed: "Başarısız",
    detected: "{lang} · %{pct}", segments: "{n} bölüm", words: "{n} kelime", segment1: "1 bölüm", word1: "1 kelime",
    timestamps: "Zaman damgaları", copy: "Kopyala", copied: "Panoya kopyalandı", saved: "Kaydedildi",
    errUrl: "Geçerli bir bağlantı girin (https://…)", errFile: "Önce bir dosya seçin",
    errServer: "Yerel motor yanıt vermiyor",
    theme: "Tema",
  },
};
const MODEL_NAMES = { tiny: "Tiny", base: "Base", small: "Small", "large-v3-turbo": "Large v3 Turbo", "large-v3": "Large v3" };

const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};
const state = { lang: "en", info: null, model: null, tab: "link", file: null, job: null, segs: [], timer: null };

function t(key, vars = {}) {
  const s = I18N[state.lang][key] ?? I18N.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
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
  if (state.job) renderJob(state.job);
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
  $("device").textContent = t("device", { ram: Math.round(i.ram_gb), cores: i.cores, hw: i.gpu ? t("gpu") : t("cpu") });
}

function meter(label, n, cls) {
  return `<span class="meter ${cls}"><b>${label}</b><span class="sr">${n}/5</span>${[1, 2, 3, 4, 5].map((k) => `<i aria-hidden="true" class="${k <= n ? "on" : ""}"></i>`).join("")}</span>`;
}

function renderModels() {
  const i = state.info;
  $("models").innerHTML = i.models.map((m) => {
    const badges = [
      m.id === i.recommended ? `<span class="badge">${t("recommended")}</span>` : "",
      m.cached ? `<span class="badge ok">${t("ready")}</span>` : "",
      !i.gpu && m.ram_gb * 2 > i.ram_gb ? `<span class="badge warn">${t("heavy")}</span>` : "",
    ].join("");
    return `<button class="model" role="radio" aria-checked="${m.id === state.model}" data-id="${m.id}">
      <span class="radio" aria-hidden="true"></span>
      <span class="model-name">${MODEL_NAMES[m.id]} ${badges}</span>
      <span class="model-side">${meter(t("accuracy"), m.quality, "")}${meter(t("speed"), m.speed, "speed")}
        <span>${m.cached ? fmtSize(m.size_mb) : t("oneTime", { size: fmtSize(m.size_mb) })}</span></span>
      <span class="model-desc">${t("m." + m.id)}</span>
    </button>`;
  }).join("");
  $("models").querySelectorAll(".model").forEach((b) => {
    b.onclick = () => { state.model = b.dataset.id; store.set("sada.model", state.model); renderModels(); };
  });
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
$("url").addEventListener("keydown", (e) => { if (e.key === "Enter") start(); });

function setFile(f) {
  state.file = f || null;
  $("fileName").textContent = f ? `${f.name} · ${fmtSize(Math.max(1, Math.round(f.size / 1e6)))}` : "";
  showFormError("");
}
$("file").onchange = (e) => setFile(e.target.files[0]);
const drop = $("drop");
["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", (e) => setFile(e.dataTransfer.files[0]));
// a file dropped anywhere in the window goes to the file tab
window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.target.closest("#drop") || !e.dataTransfer.files[0]) return;
  document.querySelector('.tabs [data-tab="file"]').click();
  setFile(e.dataTransfer.files[0]);
});

function showFormError(msg) { $("formError").hidden = !msg; $("formError").textContent = msg; }

/* ---------------- jobs ---------------- */

async function start() {
  const opts = { model: state.model, language: $("language").value, task: $("task").value };
  let job;
  try {
    if (state.tab === "link") {
      const url = $("url").value.trim();
      if (!/^https?:\/\/\S+$/i.test(url)) return showFormError(t("errUrl"));
      $("startBtn").disabled = true;
      job = await api("/api/jobs/url", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, ...opts }) });
    } else {
      if (!state.file) return showFormError(t("errFile"));
      $("startBtn").disabled = true;
      const q = new URLSearchParams({ name: state.file.name, ...opts });
      job = await api(`/api/jobs/file?${q}`, { method: "POST", headers: { "Content-Type": "application/octet-stream" }, body: state.file });
    }
  } catch (e) {
    $("startBtn").disabled = false;
    return showFormError(e.message || t("errServer"));
  }
  showFormError("");
  state.job = job; state.segs = [];
  $("transcript").innerHTML = "";
  $("empty").hidden = true; $("job").hidden = false;
  renderJob(job);
  poll();
}
$("startBtn").onclick = start;

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
    else { $("startBtn").disabled = false; loadInfo(); }
  } catch {
    state.timer = setTimeout(poll, 1500);
  }
}

function renderJob(job) {
  const running = ["queued", "running"].includes(job.status);
  $("jobTitle").textContent = job.title || "";
  $("cancelBtn").hidden = !running;
  $("newBtn").hidden = running;

  const m = state.info?.models.find((x) => x.id === job.model);
  const steps = [...(job.url ? [["download", t("download")]] : []), ["model", t("load")], ["transcribe", t("transcribing")]];
  const order = ["queued", ...steps.map((s) => s[0]), "done"];
  const cur = order.indexOf(job.stage);
  $("steps").innerHTML = steps.map(([k, label]) => {
    const i = order.indexOf(k);
    const cls = job.stage === "done" || i < cur ? "done" : i === cur && running ? "active" : "";
    return `<li class="${cls}">${label}</li>`;
  }).join("");

  const stageText = {
    queued: t("queued"), download: t("download"), model: !m || m.cached ? t("load") : t("loadFirst", { size: fmtSize(m.size_mb) }),
    transcribe: t("transcribing"), done: t("done"),
  }[job.stage];
  const statusText = { cancelled: t("cancelled"), error: t("failed") }[job.status];
  $("stageText").textContent = statusText || stageText || "";
  const indet = running && (job.stage === "model" || job.stage === "queued" || (job.stage === "download" && !job.progress));
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
    state.segs.length ? `<span class="chip">${t(state.segs.length === 1 ? "segment1" : "segments", { n: state.segs.length })} · ${t(words === 1 ? "word1" : "words", { n: words })}</span>` : "",
  ];
  $("chips").innerHTML = chips.join("");
  $("toolbar").hidden = !state.segs.length;

  const typing = $("transcript").querySelector(".typing");
  if (running && job.stage === "transcribe" && !typing) $("transcript").insertAdjacentHTML("beforeend", '<div class="typing"><i></i><i></i><i></i></div>');
  if (!(running && job.stage === "transcribe") && typing) typing.remove();
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

$("cancelBtn").onclick = () => state.job && api(`/api/jobs/${state.job.id}/cancel`, { method: "POST" }).catch(() => {});
$("newBtn").onclick = () => {
  state.job = null; state.segs = [];
  $("job").hidden = true; $("empty").hidden = false;
  $("url").value = ""; setFile(null); $("file").value = "";
};
$("tsToggle").onchange = (e) => $("transcript").classList.toggle("plain", !e.target.checked);

/* ---------------- export ---------------- */

function exportAs(fmt) {
  const segs = state.segs;
  if (fmt === "txt") return segs.map((s) => s.text).join("\n");
  if (fmt === "srt") return segs.map((s, i) => `${i + 1}\n${fmtTime(s.start, ",", true)} --> ${fmtTime(s.end, ",", true)}\n${s.text}\n`).join("\n");
  if (fmt === "vtt") return "WEBVTT\n\n" + segs.map((s) => `${fmtTime(s.start, ".", true)} --> ${fmtTime(s.end, ".", true)}\n${s.text}\n`).join("\n");
  const j = state.job;
  return JSON.stringify({ title: j.title, source: j.url, model: j.model, task: j.task, language: j.language,
    language_probability: j.language_prob, duration: j.duration, segments: segs }, null, 2);
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

applyTheme(store.get("sada.theme"));
applyLang(store.get("sada.lang") || (navigator.language || "en").slice(0, 2));
loadInfo();
