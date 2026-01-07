(() => {
  const AFF = "https://lkts.pro/5024";
  const PROMO = "SMOG";

  // set affiliate
  document.querySelectorAll("[data-cta]").forEach(a => {
    a.href = AFF;
    a.target = "_blank";
    a.rel = "nofollow sponsored noopener";
  });

  // mobile menu
  const mnav = document.getElementById("mnav");
  document.getElementById("menuOpen")?.addEventListener("click", ()=> {
    mnav?.classList.add("open");
    mnav?.setAttribute("aria-hidden", "false");
  });
  document.getElementById("menuClose")?.addEventListener("click", ()=> {
    mnav?.classList.remove("open");
    mnav?.setAttribute("aria-hidden", "true");
  });
  mnav?.addEventListener("click", (e)=> {
    if(e.target === mnav) {
      mnav.classList.remove("open");
      mnav.setAttribute("aria-hidden","true");
    }
  });
  document.querySelectorAll(".mLink").forEach(a => {
    a.addEventListener("click", ()=> {
      mnav?.classList.remove("open");
      mnav?.setAttribute("aria-hidden","true");
    });
  });

  // smooth anchor scroll
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth", block:"start"});
    history.replaceState(null, "", id);
  });

  // toast
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toastText");
  const toastClose = document.getElementById("toastClose");
  function showToast(text) {
    if(!toast || !toastText) return;
    toastText.textContent = text || "";
    toast.classList.add("on");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=> toast.classList.remove("on"), 2400);
  }
  toastClose?.addEventListener("click", ()=> toast?.classList.remove("on"));

  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      return true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = txt;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        return true;
      } catch {
        return false;
      }
    }
  }

  // promo copy
  document.querySelectorAll("[data-copy-promo]").forEach(el => {
    const run = ()=> copyText(PROMO).then(ok => {
      showToast(ok ? ("Промокод: " + PROMO + " (вводится при регистрации)") : "Не удалось скопировать");
    });
    el.addEventListener("click", run);
    el.addEventListener("keydown", (e)=> {
      if(e.key === "Enter" || e.key === " ") { e.preventDefault(); run(); }
    });
  });

  // reveal animations
  const els = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    for (const ent of entries) {
      if(ent.isIntersecting) {
        ent.target.classList.add("on");
        io.unobserve(ent.target);
      }
    }
  }, {threshold: 0.12});
  els.forEach(el => io.observe(el));
})();
