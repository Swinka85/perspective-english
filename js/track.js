/* Perspective English: Google Analytics events for the links that matter.
   Sends only what was clicked and on which page. No personal data. */
(function () {
  function send(name, params) {
    try { if (typeof gtag === "function") gtag("event", name, params); } catch (e) {}
  }
  function text(el) { return el ? (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80) : ""; }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var href = a.getAttribute("href") || "", page = location.pathname.replace(/^\//, "") || "index.html";
    if (/payhip\.com/.test(href)) {
      var card = a.closest(".buy-card");
      var product = card ? text(card.querySelector(".buy-kicker")) : text(a);
      var price = (text(a).match(/\$\d+(\.\d\d)?/) || [""])[0] || (card ? (text(card.querySelector(".buy-price strong")) || "") : "");
      send("buy_click", { product: product, price: price, page: page, link_url: href });
    } else if (/-practice-room(-a1-a2|-c1-c2)?\.html/.test(href)) {
      send("practice_room_click", { room: href, page: page });
    } else if (/\.mp3(\?|$)/.test(href)) {
      send("audio_click", { file: href, page: page });
    } else if (/downloads\/.+\.pdf(\?|$)/.test(href)) {
      send("free_download", { file: href, page: page });
    }
  }, true);
})();
