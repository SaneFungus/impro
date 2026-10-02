(function () {
  "use strict";
  var D = window.DANE || {};
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var TODO = '<span class="chip todo">do uzupełnienia</span>';
  var val = function (v) { return v == null || v === "" ? TODO : esc(v); };

  // ---------- Kolory emocji ----------
  var JASNOSC = [80, 62, 44]; // stopień 0 = łagodny, 1 = podstawowy, 2 = silny
  function kolor(h, s) { return "hsl(" + h + " 75% " + JASNOSC[s] + "%)"; }

  // ---------- Sylabus ----------
  function renderSylabus() {
    var S = D.sylabus; if (!S) return;
    var html = '<div class="syl">';
    html += '<div class="block"><h3>Informacje</h3><dl class="dl">' +
      S.podstawowe.map(function (p) { return "<div><dt>" + esc(p.etykieta) + "</dt><dd>" + val(p.wartosc) + "</dd></div>"; }).join("") +
      "</dl></div>";
    S.sekcje.forEach(function (s) {
      html += '<div class="block" id="syl-' + esc(s.id) + '"><h3>' + esc(s.tytul) + (s.szkic ? ' <span class="chip">szkic</span>' : "") + "</h3>";
      if (s.punkty) {
        html += '<dl class="dl">' + s.punkty.map(function (p) { return "<div><dt>" + esc(p.etykieta) + "</dt><dd>" + val(p.wartosc) + "</dd></div>"; }).join("") + "</dl>";
      }
      if (s.kody) {
        html += '<div class="codes">' + s.kody.map(function (k) { return '<span class="code"><b>' + esc(k.kod) + "</b>" + esc(k.opis) + "</span>"; }).join("") + "</div>";
      }
      if (s.tekst) html += "<p>" + esc(s.tekst) + "</p>";
      if (s.lista) html += '<ul class="list">' + s.lista.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul>";
      html += "</div>";
    });
    html += "</div>";
    $("#syl").innerHTML = html;
  }

  // ---------- Ćwiczenia ----------
  var cwStan = { tagi: new Set(), q: "" };
  function renderCwiczenia() {
    var lista = D.cwiczenia || [];
    var box = $("#cw");
    box.innerHTML =
      '<div class="filters"><input id="cw-q" class="search" type="search" placeholder="Szukaj ćwiczenia…" aria-label="Szukaj ćwiczenia">' +
      '<div class="filters" id="cw-tagi"></div></div><div class="cw-list" id="cw-list"></div>';
    $("#cw-q").addEventListener("input", function (e) { cwStan.q = e.target.value.toLowerCase(); rysuj(); });
    function rysuj() {
      var tagHtml = (D.tagi || []).map(function (t) {
        var n = lista.filter(function (c) { return c.tagi.indexOf(t) >= 0; }).length;
        if (!n) return "";
        return '<button class="tagbtn" data-tag="' + esc(t) + '" aria-pressed="' + cwStan.tagi.has(t) + '">' + esc(t) + '<span class="n">' + n + "</span></button>";
      }).join("");
      $("#cw-tagi").innerHTML = tagHtml;
      var wynik = lista.filter(function (c) {
        for (var t of cwStan.tagi) if (c.tagi.indexOf(t) < 0) return false;
        if (!cwStan.q) return true;
        return (c.nazwa + " " + c.przebieg + " " + c.cel + " " + c.tagi.join(" ")).toLowerCase().indexOf(cwStan.q) >= 0;
      });
      $("#cw-list").innerHTML = wynik.length ? wynik.map(function (c) {
        return '<details class="cw"><summary><h3>' + esc(c.nazwa) + "</h3>" +
          '<span class="chip">' + esc(c.czas) + '</span><span class="chip">' + esc(c.osoby) + "</span>" +
          (c.przyklad ? '<span class="chip todo">przykład</span>' : "") + "</summary>" +
          '<div class="cw-body"><div class="cw-tags">' + c.tagi.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
          '<p><span class="k">Przebieg</span>' + esc(c.przebieg) + "</p>" +
          '<p><span class="k">Czego uczy</span>' + esc(c.cel) + "</p>" +
          (c.wariacje ? '<p><span class="k">Wariacje</span>' + esc(c.wariacje) + "</p>" : "") +
          (c.zrodlo ? '<p><span class="k">Źródło</span>' + esc(c.zrodlo) + "</p>" : "") +
          "</div></details>";
      }).join("") : '<p class="empty">Brak ćwiczeń dla tych filtrów.</p>';
    }
    $("#cw-tagi").addEventListener("click", function (e) {
      var b = e.target.closest(".tagbtn"); if (!b) return;
      var t = b.dataset.tag;
      if (cwStan.tagi.has(t)) cwStan.tagi.delete(t); else cwStan.tagi.add(t);
      rysuj();
    });
    rysuj();
  }

  // ---------- Plutchik ----------
  var plSel = { i: 0, s: 1 };
  function pt(r, deg) { var a = deg * Math.PI / 180; return [200 + r * Math.cos(a), 200 + r * Math.sin(a)]; }
  function wycinek(r0, r1, a0, a1) {
    var p1 = pt(r1, a0), p2 = pt(r1, a1), p3 = pt(r0, a1), p4 = pt(r0, a0);
    var f = function (p) { return p[0].toFixed(2) + " " + p[1].toFixed(2); };
    return "M" + f(p1) + " A" + r1 + " " + r1 + " 0 0 1 " + f(p2) + " L" + f(p3) + " A" + r0 + " " + r0 + " 0 0 0 " + f(p4) + " Z";
  }
  function renderPlutchik() {
    var P = D.plutchik; if (!P) return;
    var E = P.emocje;
    // pierścienie: [r0, r1] dla stopnia 0 (zewn., łagodny), 1, 2 (wewn., silny)
    var R = [[138, 186], [84, 138], [30, 84]];
    var svg = '<svg class="wheel" viewBox="-64 -8 528 416" role="img" aria-label="Koło emocji Plutchika">';
    E.forEach(function (e, i) {
      var c = -90 + i * 45, a0 = c - 22.5, a1 = c + 22.5;
      [0, 1, 2].forEach(function (s) {
        svg += '<path data-i="' + i + '" data-s="' + s + '" d="' + wycinek(R[s][0], R[s][1], a0, a1) + '" fill="' + kolor(e.odcien, s) + '"><title>' + esc(e.stopnie[s]) + "</title></path>";
      });
      var pb = pt(111, c), pm = pt(162, c);
      svg += '<text class="lbl" x="' + pb[0].toFixed(1) + '" y="' + pb[1].toFixed(1) + '" text-anchor="middle" dominant-baseline="middle">' + esc(e.stopnie[1]) + "</text>";
      svg += '<text class="lbl" x="' + pm[0].toFixed(1) + '" y="' + pm[1].toFixed(1) + '" text-anchor="middle" dominant-baseline="middle">' + esc(e.stopnie[0]) + "</text>";
      var d = c + 22.5, pd = pt(200, d), cos = Math.cos(d * Math.PI / 180);
      var anchor = cos > 0.2 ? "start" : cos < -0.2 ? "end" : "middle";
      svg += '<text class="dyad" x="' + pd[0].toFixed(1) + '" y="' + pd[1].toFixed(1) + '" text-anchor="' + anchor + '" dominant-baseline="middle">' + esc(P.diady[i]) + "</text>";
    });
    svg += "</svg>";
    $("#p-plutchik").innerHTML =
      '<p class="intro">' + esc(P.wstep) + '</p><div class="pl"><div>' + svg +
      '<p class="gen-note" style="text-align:center;margin-top:8px">Kliknij pole. Na zewnątrz: emocje złożone z dwóch sąsiednich.</p></div><div class="detail" id="pl-det" aria-live="polite"></div></div>';
    $("#p-plutchik .wheel").addEventListener("click", function (e) {
      var p = e.target.closest("path"); if (!p) return;
      plSel = { i: +p.dataset.i, s: +p.dataset.s }; detal();
    });
    detal();
  }
  function detal() {
    var P = D.plutchik, E = P.emocje, i = plSel.i, s = plSel.s, e = E[i];
    document.querySelectorAll("#p-plutchik path").forEach(function (p) {
      p.classList.toggle("sel", +p.dataset.i === i && +p.dataset.s === s);
    });
    var przec = E[(i + 4) % 8];
    var prev = E[(i + 7) % 8], next = E[(i + 1) % 8];
    $("#pl-det").innerHTML =
      '<div class="steps"><span class="swatch" style="display:inline-block;width:14px;height:14px;border-radius:3px;background:' + kolor(e.odcien, s) + '"></span>' +
      e.stopnie.map(function (n, k) { return '<span class="' + (k === s ? "on" : "") + '">' + esc(n) + "</span>"; }).join(" → ") + "</div>" +
      "<h3>" + esc(e.stopnie[s]) + "</h3>" +
      '<div class="kv"><span class="k">Przeciwieństwo</span><span>' + esc(przec.stopnie[s]) + " (" + esc(przec.nazwa) + ")</span></div>" +
      '<div class="kv"><span class="k">Emocje złożone</span><span>' +
        esc(P.diady[(i + 7) % 8]) + " = " + esc(prev.nazwa) + " + " + esc(e.nazwa) + "<br>" +
        esc(P.diady[i]) + " = " + esc(e.nazwa) + " + " + esc(next.nazwa) + "</span></div>" +
      '<div class="kv"><span class="k">W ciele</span><span>' + esc(e.cialo) + "</span></div>" +
      '<div class="kv"><span class="k">Zadanie na scenę</span><span>' + esc(e.zadanie) + "</span></div>";
  }

  // ---------- Laban ----------
  var lbSel = [0, 0, 0];
  function renderLaban() {
    var L = D.laban; if (!L) return;
    var h = '<p class="intro">' + esc(L.wstep) + '</p><div class="lb"><div style="display:grid;gap:18px">';
    L.czynniki.forEach(function (f, k) {
      h += '<div class="factor"><span class="fn">' + esc(f.nazwa) + '</span><span class="fd">' + esc(f.opis) + '</span><div class="seg" data-k="' + k + '">' +
        f.bieguny.map(function (b, j) { return '<button data-j="' + j + '">' + esc(b) + "</button>"; }).join("") + "</div></div>";
    });
    h += '<p class="fd" style="color:var(--muted);font-size:.92rem">' + esc(L.przeplyw) + "</p></div>";
    h += '<div style="display:grid;gap:16px"><div class="detail lb-res" id="lb-res" aria-live="polite"></div><div class="cube" id="lb-cube">' +
      ["000","001","010","011","100","101","110","111"].map(function (key) { return '<button data-key="' + key + '">' + esc(L.dzialania[key].nazwa) + "</button>"; }).join("") +
      "</div></div></div>";
    $("#p-laban").innerHTML = h;
    $("#p-laban").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var seg = b.closest(".seg");
      if (seg) { lbSel[+seg.dataset.k] = +b.dataset.j; }
      else if (b.dataset.key) { lbSel = b.dataset.key.split("").map(Number); }
      else return;
      lbRysuj();
    });
    lbRysuj();
  }
  function lbRysuj() {
    var L = D.laban, key = lbSel.join(""), a = L.dzialania[key];
    document.querySelectorAll("#p-laban .seg").forEach(function (seg) {
      seg.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.j === lbSel[+seg.dataset.k]); });
    });
    document.querySelectorAll("#lb-cube button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.key === key); });
    var opis = L.czynniki.map(function (f, k) { return f.bieguny[lbSel[k]]; }).join(" · ");
    $("#lb-res").innerHTML =
      '<span class="en">' + esc(opis) + '</span><span class="big">' + esc(a.nazwa) + '</span><span class="en">' + esc(a.en) + "</span>" +
      '<div class="kv"><span class="k">W codzienności</span><span>' + esc(a.przyklad) + "</span></div>" +
      '<div class="kv"><span class="k">Postać</span><span>' + esc(a.postac) + "</span></div>";
  }

  // ---------- Status ----------
  function poziom(n) { return n <= 3 ? "niski" : n >= 8 ? "wysoki" : "sredni"; }
  var NAZWA_POZ = { niski: "niski", sredni: "średni", wysoki: "wysoki" };
  function renderStatus() {
    var S = D.status; if (!S) return;
    var fig = function (x, lab) {
      return '<g><circle cx="' + x + '" cy="104" r="15" style="fill:var(--fg)"></circle><rect x="' + (x - 11) + '" y="122" width="22" height="24" rx="5" style="fill:var(--fg)"></rect>' +
        '<text x="' + x + '" y="109" text-anchor="middle" style="fill:var(--bg);font:700 14px var(--f-display)">' + lab + "</text></g>";
    };
    var svg = '<svg class="seesaw" viewBox="0 0 560 220" role="img" aria-label="Huśtawka statusu">' +
      '<polygon points="280,152 252,206 308,206" style="fill:var(--muted)"></polygon>' +
      '<line x1="40" y1="207" x2="520" y2="207" style="stroke:var(--line);stroke-width:2"></line>' +
      '<g class="beam" id="beam"><rect x="60" y="146" width="440" height="9" rx="4" style="fill:var(--tape)"></rect>' + fig(100, "A") + fig(460, "B") + "</g></svg>";
    var h = '<p class="intro">' + esc(S.wstep) + '</p><div class="st">' + svg +
      '<div class="slider-row"><label for="st-a">Status A</label><input id="st-a" type="range" min="1" max="10" value="7"><output id="st-ao">7</output></div>' +
      '<div class="slider-row"><label>Status B</label><span class="gen-note">huśtawka: B = 11 − A</span><output id="st-bo">4</output></div>' +
      '<div class="two" id="st-beh"></div>' +
      '<p class="grp-h">Zasady</p><div class="cards">' + S.zasady.map(function (z) { return '<div class="card"><h3>' + esc(z.t) + "</h3><p>" + esc(z.o) + "</p></div>"; }).join("") + "</div></div>";
    $("#p-status").innerHTML = h;
    var inp = $("#st-a");
    inp.addEventListener("input", stRysuj);
    stRysuj();
  }
  function stRysuj() {
    var S = D.status, a = +$("#st-a").value, b = 11 - a;
    $("#st-ao").textContent = a; $("#st-bo").textContent = b;
    $("#beam").style.transform = "rotate(" + ((a - 5.5) * 3.2) + "deg)";
    var blok = function (lab, n) {
      var p = poziom(n);
      return '<div class="card"><h3>' + lab + ": " + n + "/10 · " + NAZWA_POZ[p] + '</h3><ul class="list">' +
        S.zachowania[p].map(function (z) { return "<li>" + esc(z) + "</li>"; }).join("") + "</ul></div>";
    };
    $("#st-beh").innerHTML = blok("A", a) + blok("B", b);
  }

  // ---------- Proste listy kategorii ----------
  function renderListy() {
    var Pz = D.propozycje;
    if (Pz) $("#p-propozycje").innerHTML = '<p class="intro">' + esc(Pz.wstep) + '</p><div class="cards">' +
      Pz.hasla.map(function (z) { return '<div class="card"><h3>' + esc(z.t) + "</h3><p>" + esc(z.o) + "</p></div>"; }).join("") + "</div>";
    var V = D.viewpoints;
    if (V) {
      var grp = function (tyt, arr) { return '<p class="grp-h">' + tyt + '</p><div class="cards">' + arr.map(function (z) { return '<div class="card"><h3>' + esc(z.t) + "</h3><p>" + esc(z.o) + "</p></div>"; }).join("") + "</div>"; };
      $("#p-viewpoints").innerHTML = '<p class="intro">' + esc(V.wstep) + "</p>" + grp("Czas", V.czas) + grp("Przestrzeń", V.przestrzen);
    }
  }

  // ---------- Zakładki ----------
  var TABS = ["plutchik", "laban", "status", "propozycje", "viewpoints"];
  function pokazTab(id, przewin) {
    TABS.forEach(function (t) {
      $("#t-" + t).setAttribute("aria-selected", t === id);
      $("#p-" + t).hidden = t !== id;
    });
    if (przewin) $("#kategorie").scrollIntoView();
  }
  function initTabs() {
    document.querySelector(".tabs").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-tab]"); if (!b) return;
      pokazTab(b.dataset.tab, false);
      try { history.replaceState(null, "", "#" + b.dataset.tab); } catch (err) {}
    });
    var h = (location.hash || "").slice(1);
    pokazTab(TABS.indexOf(h) >= 0 ? h : "plutchik", TABS.indexOf(h) >= 0);
  }

  // ---------- Generator ----------
  var gen = { lock: {}, v: {} };
  var GEN_KLUCZE = ["emocja", "laban", "status", "miejsce", "relacja"];
  function losuj() {
    var P = D.plutchik, L = D.laban, G = D.generator;
    if (!gen.lock.emocja) gen.v.emocja = { i: Math.floor(Math.random() * 8), s: Math.floor(Math.random() * 3) };
    if (!gen.lock.laban) gen.v.laban = pick(Object.keys(L.dzialania));
    if (!gen.lock.status) { var a = 1 + Math.floor(Math.random() * 10), b; do { b = 1 + Math.floor(Math.random() * 10); } while (b === a); gen.v.status = [a, b]; }
    if (!gen.lock.miejsce) gen.v.miejsce = pick(G.miejsca);
    if (!gen.lock.relacja) gen.v.relacja = pick(G.relacje);
    genRysuj();
  }
  function genTekst() {
    var P = D.plutchik, L = D.laban, v = gen.v, e = P.emocje[v.emocja.i];
    return "Miejsce: " + v.miejsce + ". Relacja: " + v.relacja + ". A zaczyna w emocji: " + e.stopnie[v.emocja.s] +
      ", ruch: " + L.dzialania[v.laban].nazwa + ". Status: A " + v.status[0] + "/10, B " + v.status[1] + "/10.";
  }
  function genRysuj() {
    var P = D.plutchik, L = D.laban, v = gen.v, e = P.emocje[v.emocja.i], la = L.dzialania[v.laban];
    var karta = function (k, lab, wart, sub) {
      return '<div class="gcard"><span class="lab">' + lab + '<button class="lock" data-k="' + k + '" aria-pressed="' + !!gen.lock[k] + '">' + (gen.lock[k] ? "zablokowane" : "zablokuj") + "</button></span>" +
        '<span class="val">' + wart + '</span><span class="sub">' + sub + "</span></div>";
    };
    var opisLaban = L.czynniki.map(function (f, k) { return f.bieguny[+v.laban[k]]; }).join(", ");
    var wyz = v.status[0] > v.status[1] ? "A gra wyżej" : "B gra wyżej";
    $("#gen-grid").innerHTML =
      karta("emocja", "Emocja", '<span class="swatch" style="background:' + kolor(e.odcien, v.emocja.s) + '"></span>' + esc(e.stopnie[v.emocja.s]), "z rodziny: " + esc(e.nazwa)) +
      karta("laban", "Ruch (Laban)", esc(la.nazwa), esc(opisLaban)) +
      karta("status", "Status", "A " + v.status[0] + " · B " + v.status[1], wyz + ", różnica " + Math.abs(v.status[0] - v.status[1])) +
      karta("miejsce", "Miejsce", esc(v.miejsce), "") +
      karta("relacja", "Relacja", esc(v.relacja), "");
    $("#gen-txt").textContent = genTekst();
  }
  function initGen() {
    $("#gen").innerHTML = '<div class="gen-grid" id="gen-grid"></div><div class="gen-actions">' +
      '<button class="btn primary" id="gen-los">Losuj</button><button class="btn" id="gen-kop">Kopiuj opis</button>' +
      '<span class="gen-note" id="gen-msg" aria-live="polite"></span></div><p class="gen-note" id="gen-txt"></p>';
    $("#gen-los").addEventListener("click", losuj);
    $("#gen-grid").addEventListener("click", function (e) {
      var b = e.target.closest(".lock"); if (!b) return;
      gen.lock[b.dataset.k] = !gen.lock[b.dataset.k]; genRysuj();
    });
    $("#gen-kop").addEventListener("click", function () {
      var t = genTekst(), msg = $("#gen-msg");
      var zaznacz = function () {
        var r = document.createRange(); r.selectNodeContents($("#gen-txt"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        msg.textContent = "Tekst zaznaczony. Skopiuj go skrótem Ctrl+C.";
      };
      try {
        navigator.clipboard.writeText(t).then(function () { msg.textContent = "Skopiowano."; }, zaznacz);
      } catch (err) { zaznacz(); }
    });
    losuj();
  }

  // ---------- Biblioteka ----------
  var bibFiltr = "wszystko";
  function renderBiblioteka() {
    var B = D.biblioteka || [];
    $("#bib").innerHTML = '<div class="filters" id="bib-f" >' +
      [["wszystko", "Wszystko"], ["moje", "Teksty prowadzącego"], ["ksiazka", "Literatura"]].map(function (f) {
        return '<button class="tagbtn" data-f="' + f[0] + '">' + f[1] + "</button>";
      }).join("") + '</div><div class="bib-list" id="bib-list"></div>';
    function rysuj() {
      document.querySelectorAll("#bib-f .tagbtn").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.f === bibFiltr); });
      var w = B.filter(function (k) { return bibFiltr === "wszystko" || k.rodzaj === bibFiltr; });
      $("#bib-list").innerHTML = w.map(function (k) {
        return '<div class="book"><span class="au">' + esc(k.autor) + (k.rok ? " · " + esc(k.rok) : "") + '</span><span class="ti">' + esc(k.tytul) + "</span>" +
          (k.opis ? '<span class="op">' + esc(k.opis) + "</span>" : "") +
          (k.link ? '<a class="go" href="' + esc(k.link) + '" target="_blank" rel="noopener">Otwórz ↗</a>' : '<span class="go none">zapytaj prowadzącego</span>') + "</div>";
      }).join("");
    }
    $("#bib-f").addEventListener("click", function (e) { var b = e.target.closest(".tagbtn"); if (!b) return; bibFiltr = b.dataset.f; rysuj(); });
    rysuj();
  }

  // ---------- Start ----------
  function start() {
    renderSylabus();
    renderCwiczenia();
    renderPlutchik();
    renderLaban();
    renderStatus();
    renderListy();
    initTabs();
    initGen();
    renderBiblioteka();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
