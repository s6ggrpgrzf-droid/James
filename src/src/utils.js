async function load(k, fb) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fb;
  } catch { return fb; }
}

async function save(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

function copyMsg(text, key) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      // Toast will be shown from App
    });
  }
}

window.load = load;
window.save = save;
window.copyMsg = copyMsg;
