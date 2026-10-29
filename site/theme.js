// Applies the colours and font chosen in content.js (`theme`) before the page draws.
// You don't need to edit this file — pick a preset or override colours in content.js.
(function () {
  var PRESETS = {
    // The original look: warm off-white with an orange accent.
    warm: {
      bg: "#F3F0EB", "bg-alt": "#EDE9E2", surface: "#FFFFFF", "surface-2": "#FBFAF7",
      ink: "#0A0A0A", "text-2": "#3A3632", text: "#4A4642", "muted-2": "#6B655F", muted: "#86807A", faint: "#7A746D",
      line: "#E3DED5", "line-2": "#DCD6CC", "line-3": "#CFC8BD", "line-3-hover": "#B9B1A5", hover: "#E9E4DB",
      ph: "#E7E2DA", "ph-stripe": "#DED8CE",
      accent: "#FF5A1F", "on-accent": "#FFFFFF"
    },
    // Crisp white and cool greys.
    clean: {
      bg: "#FFFFFF", "bg-alt": "#F5F5F7", surface: "#FFFFFF", "surface-2": "#FAFAFB",
      ink: "#0B0B0F", "text-2": "#34343A", text: "#4A4A52", "muted-2": "#63636B", muted: "#83838B", faint: "#7A7A82",
      line: "#E5E5EA", "line-2": "#D9D9DF", "line-3": "#C9C9D0", "line-3-hover": "#ADADB5", hover: "#EFEFF3",
      ph: "#ECECF0", "ph-stripe": "#E2E2E8",
      accent: "#2F5BFF", "on-accent": "#FFFFFF"
    },
    // Near-black background, light text.
    dark: {
      bg: "#0C0C0D", "bg-alt": "#141416", surface: "#1A1A1D", "surface-2": "#161618",
      ink: "#F4F4F2", "text-2": "#D6D5D1", text: "#B9B7B2", "muted-2": "#A09D98", muted: "#8C8984", faint: "#7E7B76",
      line: "#29292D", "line-2": "#333338", "line-3": "#45454B", "line-3-hover": "#5C5C63", hover: "#202024",
      ph: "#1C1C1F", "ph-stripe": "#232327",
      accent: "#FF5A1F", "on-accent": "#FFFFFF"
    }
  };
  var SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';

  var P = window.PORTFOLIO;
  if (!P || typeof P !== "object") {
    // content.js failed to load or has a typo — say so on the page instead of showing a blank screen.
    document.addEventListener("DOMContentLoaded", function () {
      var box = document.createElement("div");
      box.setAttribute("role", "alert");
      box.style.cssText = "position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(243,240,235,.94);font:16px/1.5 " + SYSTEM_FONT + ";";
      box.innerHTML = '<div style="max-width:520px;padding:28px;border-radius:16px;background:#fff;color:#111;box-shadow:0 12px 40px rgba(0,0,0,.15)">' +
        '<strong>content.js didn’t load.</strong><br>Usually this is a missing comma, quote or bracket. ' +
        'Run <code>npm run build</code> (or check your Vercel build log) to see the exact line.</div>';
      document.body.appendChild(box);
    });
    return;
  }

  var t = P.theme || {};
  var vars = Object.assign({}, PRESETS[t.preset] || PRESETS.warm);
  if (t.accent) vars.accent = t.accent;
  if (t.accentText) vars["on-accent"] = t.accentText;
  if (t.colors && typeof t.colors === "object") Object.assign(vars, t.colors);

  var font = SYSTEM_FONT;
  if (t.googleFont) {
    var family = String(t.googleFont).trim();
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(family).replace(/%20/g, "+") + ":wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    font = '"' + family + '", ' + SYSTEM_FONT;
  }
  vars.font = font;

  var root = document.documentElement;
  Object.keys(vars).forEach(function (k) { root.style.setProperty("--" + k, vars[k]); });
  root.style.colorScheme = t.preset === "dark" ? "dark" : "light";
})();
