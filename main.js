// Вставь свою партнёрскую ссылку сюда:
const AFFILIATE_URL = "https://1wfafs.life/casino/list?open=register&p=7jns";

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[data-aff="true"]');
  if (!a) return;

  // Подставляем партнёрскую ссылку только при клике
  // (чтобы не светить её во всех HTML заранее)
  a.href = AFFILIATE_URL;
});
