<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>Where we are</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --paper: #F3F2EC;
    --card: #FCFBF7;
    --ink: #23302D;
    --soft: #5C6864;
    --rule: #D6D9D0;
    --alert: #A82A21;
    --mono: ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas, monospace;
    --sans: "Seravek", "Gill Sans Nova", Verdana, Ubuntu, Calibri, "DejaVu Sans", "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  html { background: var(--paper); }
  body { margin: 0; }
  #app {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 18px;
    line-height: 1.65;
    letter-spacing: 0.01em;
    padding: 24px 22px 60px;
    max-width: 1180px;
    margin: 0 auto;
    text-align: left;
  }
  p { max-width: 62ch; }
  h1 { font-size: 34px; line-height: 1.2; margin: 0 0 6px; font-weight: 600; }
  h2 { font-size: 23px; margin: 40px 0 12px; font-weight: 600; padding-bottom: 8px; border-bottom: 2px solid var(--rule); }
  h3 { font-size: 19px; margin: 0 0 6px; font-weight: 600; }
  .sub { color: var(--soft); margin: 0 0 22px; }
  .card { background: var(--card); border: 1px solid var(--rule); border-radius: 6px; }
  .muted { color: var(--soft); }

  .strip { display: flex; flex-wrap: wrap; gap: 10px; }
  .stat { flex: 1 1 160px; padding: 14px 16px; }
  .stat .n { font-family: var(--mono); font-size: 28px; font-weight: 600; display: block; line-height: 1.2; }
  .stat .l { font-size: 15px; color: var(--soft); line-height: 1.4; display: block; }

  button {
    font-family: var(--sans); font-size: 17px; cursor: pointer;
    border-radius: 6px; border: 2px solid var(--rule); background: var(--card);
    color: var(--ink); padding: 11px 16px; min-height: 48px; line-height: 1.3;
  }
  button:hover { border-color: var(--soft); }
  button:focus-visible, input:focus-visible, select:focus-visible {
    outline: 3px solid #2E6F8E; outline-offset: 2px;
  }
  .primary { background: var(--ink); color: var(--paper); border-color: var(--ink); font-weight: 600; }
  .primary:hover { background: #354642; }
  .small { font-size: 15px; padding: 8px 12px; min-height: 42px; }
  button[aria-pressed="true"] { border-color: var(--ink); background: #E8EAE1; font-weight: 600; }

  .planner-wrap { overflow-x: auto; padding: 16px 16px 10px; }
  table.year { border-collapse: separate; border-spacing: 3px; }
  table.year th {
    font-family: var(--mono); font-size: 12px; font-weight: 600; color: var(--soft);
    padding: 0 8px 6px 0; text-align: right; white-space: nowrap;
  }
  table.year th.dnum { text-align: center; padding: 0 0 6px; width: 30px; font-size: 11px; }
  td.day { padding: 0; }
  .cell {
    width: 30px; height: 30px; border: 1px solid transparent; padding: 0; min-height: 0;
    border-radius: 4px; background: #E6E8E1; position: relative;
    font-size: 15px; line-height: 1; color: #fff; text-align: center;
  }
  .cell.blank { background: transparent; cursor: default; }
  .cell.wknd { background: #D8DBD2; }
  .cell.term::after {
    content: ""; position: absolute; left: 4px; right: 4px; bottom: 3px;
    height: 2px; border-radius: 1px; background: rgba(35,48,45,.34);
  }
  .cell.filled.term::after { background: rgba(255,255,255,.72); }
  .cell.pickup::before {
    content: ""; position: absolute; top: 3px; right: 3px;
    width: 8px; height: 8px; border-radius: 50%;
    background: #23302D; box-shadow: 0 0 0 1.5px rgba(255,255,255,.55);
  }
  .cell.filled.pickup::before { background: #fff; box-shadow: 0 0 0 1.5px rgba(35,48,45,.35); }
  .cell.clash { border-color: var(--alert); box-shadow: inset 0 0 0 2px var(--alert); }
  .cell.today { outline: 3px solid var(--ink); outline-offset: 1px; }
  .cell.sel { outline: 4px solid #2E6F8E; outline-offset: 1px; }
  .cell.pending { outline: 4px dashed #2E6F8E; outline-offset: 1px; }

  .legend { padding: 14px 16px 16px; }
  .legend h3 { font-size: 16px; }
  .legend ul { list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px 26px; }
  .legend li { display: flex; align-items: center; gap: 9px; font-size: 16px; }
  .key { width: 26px; height: 26px; border-radius: 4px; display: inline-flex; align-items: center;
         justify-content: center; color: #fff; font-size: 14px; flex: none; }
  .key.plain { background: #E6E8E1; position: relative; }
  .key.plain::after { content: ""; position: absolute; left: 3px; right: 3px; bottom: 3px; height: 2px; background: rgba(35,48,45,.4); }
  .key.pickupkey { background: #E6E8E1; position: relative; }
  .key.pickupkey::after {
    content: ""; position: absolute; top: 3px; right: 3px;
    width: 8px; height: 8px; border-radius: 50%; background: #23302D;
    box-shadow: 0 0 0 1.5px rgba(255,255,255,.55);
  }
  .key.clashkey { background: #E6E8E1; box-shadow: inset 0 0 0 2px var(--alert); }

  .panel { padding: 18px 20px; margin-top: 12px; }
  .panel .when { font-family: var(--mono); font-size: 15px; color: var(--soft); }
  .panel h3 { margin: 2px 0 12px; font-size: 22px; }
  .facts { margin: 0 0 16px; padding: 0; list-style: none; }
  .facts li { margin: 4px 0; }
  .step { font-size: 16px; color: var(--soft); margin: 0 0 8px; }
  .lengths { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .choices { display: flex; flex-wrap: wrap; gap: 10px; }
  .choice {
    display: flex; align-items: center; gap: 11px; text-align: left;
    padding: 10px 16px 10px 10px; flex: 1 1 250px; max-width: 340px;
  }
  .choice .key { width: 32px; height: 32px; font-size: 16px; }
  .on-day { display: flex; align-items: center; gap: 11px; padding: 9px 0; border-top: 1px solid var(--rule); }
  .on-day .grow { flex: 1; }

  .clash-card { padding: 16px 18px; margin-bottom: 10px; border-left: 6px solid var(--alert); }
  .clash-card .dates { font-family: var(--mono); font-size: 15px; margin: 0 0 12px; }
  .none { padding: 16px 18px; color: var(--soft); }

  .row-item { display: flex; gap: 13px; align-items: center; padding: 13px 16px; border-top: 1px solid var(--rule); flex-wrap: wrap; }
  .row-item:first-child { border-top: 0; }
  .row-item .grow { flex: 1 1 220px; }
  .row-item .m { font-family: var(--mono); font-size: 15px; color: var(--soft); }
  .list-tools { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
  .month-row {
    width: 100%; display: flex; align-items: center; gap: 12px; text-align: left;
    border: 0; border-top: 1px solid var(--rule); border-radius: 0; background: transparent;
    padding: 14px 16px; font-size: 18px;
  }
  .month-row:first-child { border-top: 0; }
  .month-row:hover { background: #EDEFE8; border-color: var(--rule); }
  .month-row .chev { font-family: var(--mono); font-size: 15px; width: 16px; flex: none; }
  .month-row .mgrow { flex: 1; font-weight: 600; }
  .month-row .cnt { color: var(--soft); font-size: 15px; font-weight: 400; }
  .month-body .row-item { padding-left: 44px; background: #F7F6F1; }
  .month-body .row-item:first-child { border-top: 1px solid var(--rule); }
  .form { padding: 18px 20px; }
  .fld { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; max-width: 430px; }
  label { font-size: 16px; color: var(--soft); }
  input, select {
    font-family: var(--sans); font-size: 18px; padding: 12px 13px; min-height: 50px;
    border: 2px solid var(--rule); border-radius: 6px; background: #fff; color: var(--ink); width: 100%;
  }
  .swatches { display: flex; flex-wrap: wrap; gap: 9px; }
  .sw { width: 46px; height: 46px; border-radius: 6px; border: 3px solid transparent; padding: 0; min-height: 0;
        color: #fff; font-size: 17px; }
  .sw[aria-pressed="true"] { border-color: var(--ink); }
  .sw.used { opacity: .35; }
  .warn { color: var(--alert); font-weight: 600; margin: 0 0 12px; }
  footer { margin-top: 44px; padding-top: 16px; border-top: 2px solid var(--rule); font-size: 16px; color: var(--soft); }
  .status { display: block; margin-bottom: 6px; }
  #gate {
    min-height: 100vh; align-items: center; justify-content: center; padding: 24px;
    background: var(--paper); font-family: var(--sans);
  }
  .gate-card {
    background: var(--card); border: 1px solid var(--rule); border-radius: 8px;
    padding: 30px 28px; max-width: 400px; width: 100%; text-align: left;
  }
  .gate-card h1 { font-size: 28px; margin: 0 0 10px; color: var(--ink); }
  .gate-card p { color: var(--soft); font-size: 17px; margin: 0 0 16px; max-width: none; }
  .gate-card input {
    font-family: var(--sans); font-size: 18px; padding: 13px; min-height: 52px; width: 100%;
    border: 2px solid var(--rule); border-radius: 6px; background: #fff; color: var(--ink); margin-bottom: 12px;
  }
  .gate-card input:focus-visible { outline: 3px solid #2E6F8E; outline-offset: 2px; }
  .gate-card .primary {
    width: 100%; background: var(--ink); color: var(--paper); border: 2px solid var(--ink);
    border-radius: 6px; font-size: 18px; font-weight: 600; padding: 13px; min-height: 52px; cursor: pointer;
  }
  .gate-msg { color: var(--alert) !important; font-weight: 600; }
  .gate-note { min-height: 22px; margin: 12px 0 0 !important; font-size: 15px; }
  @media (max-width: 620px) {
    #app { padding: 16px 14px 50px; }
    h1 { font-size: 28px; }
    h2 { font-size: 21px; }
    .cell, table.year th.dnum { width: 26px; }
    .cell { height: 26px; font-size: 13px; }
    .choice { max-width: none; }
  }
</style>
</head>
<body>
<div id="gate" style="display:none"></div>
<div id="app">
  <h1>Where we are</h1>
  <p class="sub" id="sub">Opening&hellip;</p>

  <div class="strip" id="strip"></div>

  <h2>Anything clashing</h2>
  <div id="clashes"></div>

  <h2>The year</h2>
  <p class="muted" style="margin-top:-4px">Tap any day to add something to it.</p>
  <div class="card planner-wrap"><div id="planner"></div></div>
  <div class="card legend" id="legend"></div>
  <div id="panel"></div>

  <h2>Everything planned</h2>
  <div class="list-tools" id="planTools"></div>
  <div class="card" id="plans"></div>

  <h2>Your activities</h2>
  <p class="muted" style="margin-top:-4px">Each one has its own colour and its own shape, so they can be told apart without relying on colour alone.</p>
  <div class="card" id="acts"></div>
  <div id="actForm"></div>

  <h2>Names and home bases</h2>
  <div class="card form" id="settings"></div>

  <footer id="foot"></footer>
</div>

<script>
(function () {
  "use strict";

  var KEY = "planner:v3";
  var START = new Date(2026, 6, 1);
  var END = new Date(2027, 6, 31);

  // Rothwell Primary School 2026/27 - Leeds City Council terms plus the school's training days.
  var SCHOOL = [
    ["Summer term", "term", "2026-06-01", "2026-07-21"],
    ["Summer holidays", "shut", "2026-07-22", "2026-08-31"],
    ["Training day", "shut", "2026-09-01", "2026-09-01"],
    ["Autumn term", "term", "2026-09-01", "2026-10-23"],
    ["October half term", "shut", "2026-10-26", "2026-10-30"],
    ["Autumn term", "term", "2026-11-02", "2026-12-18"],
    ["Training day", "shut", "2026-12-11", "2026-12-11"],
    ["Christmas holidays", "shut", "2026-12-21", "2027-01-01"],
    ["Spring term", "term", "2027-01-04", "2027-02-12"],
    ["February half term", "shut", "2027-02-15", "2027-02-19"],
    ["Spring term", "term", "2027-02-22", "2027-04-02"],
    ["Good Friday", "shut", "2027-03-26", "2027-03-26"],
    ["Easter Monday", "shut", "2027-03-29", "2027-03-29"],
    ["Easter holidays", "shut", "2027-04-05", "2027-04-16"],
    ["Summer term", "term", "2027-04-19", "2027-05-28"],
    ["Early May bank holiday", "shut", "2027-05-03", "2027-05-03"],
    ["Training day", "shut", "2027-05-28", "2027-05-28"],
    ["May half term", "shut", "2027-05-31", "2027-06-04"],
    ["Summer term", "term", "2027-06-07", "2027-07-22"],
    ["Training day", "shut", "2027-07-02", "2027-07-02"],
    ["Training day", "shut", "2027-07-22", "2027-07-22"]
  ];

  var PALETTE = ["#3E7C59", "#2E6F8E", "#C08A1E", "#8E4A6B", "#7C8783",
                 "#1F7A76", "#B4551F", "#4A4FA8", "#6E7B24", "#7A5230"];
  var SHAPES = ["\u25CF", "\u25A0", "\u25B2", "\u2605", "\u25C6", "\u271A", "\u25BC", "\u2726"];

  function seedActs() {
    return [
      { id: "a1", tpl: "Together at %b1", colour: "#3E7C59", shape: "\u25CF", away: true, fixed: true },
      { id: "a2", tpl: "Together at %b2", colour: "#2E6F8E", shape: "\u25A0", away: false, fixed: true },
      { id: "a3", tpl: "Away together on a break", colour: "#C08A1E", shape: "\u25B2", away: true, fixed: true },
      { id: "a4", tpl: "Granddaughter staying with %n2", colour: "#8E4A6B", shape: "\u2605", away: false, fixed: true, grand: true },
      { id: "a5", tpl: "Busy at home", colour: "#7C8783", shape: "\u25C6", away: false, fixed: true }
    ];
  }

  var DEFAULTS = { n1: "Me", b1: "Stockton-on-Tees", n2: "My partner", b2: "Rothwell" };
  var state = { s: Object.assign({}, DEFAULTS), acts: seedActs(), plans: [], dismissed: {} };

  var selected = null;
  var rangeFrom = null;
  var span = 0;
  var editingAct = null;
  var showActForm = false;
  var openMonths = {};
  var openInit = false;
  var saveNote = "";
  var busy = false;

  // ---------- dates ----------
  function ymd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" +
           String(d.getDate()).padStart(2, "0");
  }
  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return ymd(d); }
  var DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MON = ["January", "February", "March", "April", "May", "June", "July",
             "August", "September", "October", "November", "December"];
  function pretty(s) {
    var d = parse(s);
    return DOW[d.getDay()].slice(0, 3) + " " + d.getDate() + " " + MON[d.getMonth()].slice(0, 3) + " " + d.getFullYear();
  }
  function longDate(s) {
    var d = parse(s);
    return DOW[d.getDay()] + " " + d.getDate() + " " + MON[d.getMonth()] + " " + d.getFullYear();
  }
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // ---------- school ----------
  function school(s) {
    var shut = null, term = null;
    for (var i = 0; i < SCHOOL.length; i++) {
      var r = SCHOOL[i];
      if (s >= r[2] && s <= r[3]) { if (r[1] === "shut") shut = r[0]; else term = r[0]; }
    }
    if (shut) return { open: false, name: shut };
    if (term) return { open: true, name: term };
    return { open: false, name: null };
  }
  function isPickupDay(s) { return parse(s).getDay() === 1 && school(s).open; }

  // ---------- activities ----------
  function actName(a) {
    if (!a) return "Something";
    var t = a.name || a.tpl || "Activity";
    return t.replace("%b1", state.s.b1).replace("%b2", state.s.b2)
            .replace("%n1", state.s.n1).replace("%n2", state.s.n2);
  }
  function act(id) {
    for (var i = 0; i < state.acts.length; i++) if (state.acts[i].id === id) return state.acts[i];
    return null;
  }

  // ---------- plans ----------
  function plansOn(s) { return state.plans.filter(function (p) { return s >= p.start && s <= p.end; }); }
  function topAct(s) {
    var on = plansOn(s);
    if (!on.length) return null;
    for (var i = 0; i < state.acts.length; i++) {
      for (var j = 0; j < on.length; j++) if (on[j].actId === state.acts[i].id) return state.acts[i];
    }
    return act(on[0].actId);
  }

  // ---------- clashes ----------
  // An activity that says where you physically are. Two different ones on one day
  // is a contradiction. Things like the granddaughter staying, or a local club night,
  // aren't location claims and never trigger this.
  function isPlace(a) {
    if (!a) return false;
    if (a.fixed) return a.id === "a1" || a.id === "a2" || a.id === "a3";
    return !!a.away;
  }

  function eachDay(fn) {
    var d = new Date(START), guard = 0;
    while (d <= END && guard++ < 500) { fn(ymd(d)); d.setDate(d.getDate() + 1); }
  }

  function placeClashes() {
    var groups = {}, order = [];
    eachDay(function (s) {
      var on = plansOn(s).filter(function (p) { return isPlace(act(p.actId)); });
      var distinct = {};
      on.forEach(function (p) { distinct[p.actId] = true; });
      if (Object.keys(distinct).length < 2) return;
      var key = on.map(function (p) { return p.id; }).sort().join("+");
      if (!groups[key]) { groups[key] = { days: [], acts: {} }; order.push(key); }
      groups[key].days.push(s);
      on.forEach(function (p) { groups[key].acts[p.actId] = true; });
    });
    return order.map(function (key) {
      var g = groups[key];
      var names = Object.keys(g.acts).map(function (id) { return actName(act(id)); });
      return {
        id: "place:" + key + ":" + g.days[0],
        title: "Two places at once",
        why: "You\u2019re down as both \u201c" + names.join("\u201d and \u201c") +
             "\u201d on the same day, which can\u2019t both be true. Remove one, or shorten its dates.",
        days: g.days
      };
    });
  }

  function clashes() {
    var out = [];
    state.plans.forEach(function (p) {
      var a = act(p.actId);
      if (!a || !a.away) return;
      var hit = [], s = p.start, guard = 0;
      while (s <= p.end && guard++ < 800) {
        if (isPickupDay(s)) hit.push(s);
        s = addDays(s, 1);
      }
      if (hit.length) out.push({
        id: p.id + ":pickup",
        title: actName(a),
        why: "That takes " + state.s.n2 + " away from " + state.s.b2 +
             ", so she isn\u2019t there for the school pickup.",
        days: hit
      });
    });
    state.plans.forEach(function (g) {
      var ga = act(g.actId);
      if (!ga || !ga.grand) return;
      var hit = [], s = g.start, guard = 0;
      while (s <= g.end && guard++ < 800) {
        var away = plansOn(s).some(function (p) { var a = act(p.actId); return a && a.away; });
        if (away) hit.push(s);
        s = addDays(s, 1);
      }
      if (hit.length) out.push({
        id: g.id + ":grand",
        title: actName(ga),
        why: "Her granddaughter is down as staying in " + state.s.b2 +
             " on days when you\u2019re both somewhere else.",
        days: hit
      });
    });
    return out.concat(placeClashes());
  }
  function live() { return clashes().filter(function (c) { return !state.dismissed[c.id]; }); }
  function clashDays() {
    var set = {};
    live().forEach(function (c) { c.days.forEach(function (d) { set[d] = true; }); });
    return set;
  }

  // ---------- storage ----------
  var API = "api/state";
  var MODE = "local";
  var CLAUDE = (function () {
    try {
      return typeof window !== "undefined" && window.storage &&
             typeof window.storage.get === "function" && typeof window.storage.set === "function";
    } catch (e) { return false; }
  })();
  var lastSeen = "";

  // Shared password (hosted version only). We never store or send the plain word:
  // it's turned into a fingerprint here and only the fingerprint travels.
  var SALT = "where-we-are-2026";
  var LSKEY = "planner:key";
  var authKey = null;    // the fingerprint, once unlocked
  var locked = false;    // true while the lock screen is up
  var needsSetup = false;

  function fingerprint(pw) {
    var enc = new TextEncoder().encode(SALT + ":" + pw);
    return crypto.subtle.digest("SHA-256", enc).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  function apply(raw) {
    if (!raw) return false;
    try {
      var v = JSON.parse(raw);
      if (!v || typeof v !== "object") return false;
      state.s = Object.assign({}, DEFAULTS, v.s || {});
      state.acts = (v.acts && v.acts.length) ? v.acts : seedActs();
      state.plans = v.plans || [];
      state.dismissed = v.dismissed || {};
      lastSeen = raw;
      return true;
    } catch (e) { return false; }
  }

  function cloudHeaders(extra) {
    var h = extra || {};
    if (authKey) h["x-planner-key"] = authKey;
    return h;
  }

  function save() {
    saveNote = "Saving\u2026"; paintFoot();
    var body = JSON.stringify(state);
    lastSeen = body;
    if (MODE === "cloud") {
      fetch(API, { method: "PUT", headers: cloudHeaders({ "content-type": "application/json" }), body: body })
        .then(function (r) {
          if (r.status === 401) { lockUp("Your session ended. Enter the password again."); throw new Error(401); }
          if (!r.ok) throw new Error(r.status);
          saveNote = "Saved. " + state.s.n2 + " will see this too."; paintFoot();
        }).catch(function () {
          if (!locked) { saveNote = "Couldn\u2019t reach the site just then. Your change is on screen but not saved yet."; paintFoot(); }
        });
      return;
    }
    if (MODE === "shared") {
      window.storage.set(KEY, body, true).then(function () {
        saveNote = "Saved. Your partner sees this too."; paintFoot();
      }).catch(function () {
        saveNote = "Couldn\u2019t save just then \u2014 your change is on screen but not kept."; paintFoot();
      });
      return;
    }
    try { window.localStorage.setItem(KEY, body); saveNote = "Saved on this computer only."; }
    catch (e) { saveNote = "This browser is blocking storage, so nothing can be kept."; MODE = "none"; }
    paintFoot();
  }

  function load() {
    return new Promise(function (resolve) {
      var canFetch = typeof fetch === "function" &&
                     typeof location !== "undefined" && /^https?:/.test(location.protocol);
      function tryLocal() {
        MODE = "local";
        try { apply(window.localStorage.getItem(KEY)); } catch (e) { MODE = "none"; }
        resolve();
      }
      function tryClaude() {
        if (!CLAUDE) { tryLocal(); return; }
        try {
          window.storage.get(KEY, true).then(function (r) {
            MODE = "shared"; apply(r && r.value); resolve();
          }).catch(function () { MODE = "shared"; resolve(); });
        } catch (e) { tryLocal(); }
      }
      if (!canFetch) { tryClaude(); return; }
      try { authKey = window.localStorage.getItem(LSKEY) || null; } catch (e) { authKey = null; }
      fetch(API, { headers: cloudHeaders({ accept: "application/json" }) })
        .then(function (r) {
          MODE = "cloud";
          if (r.status === 401) { locked = true; needsSetup = false; resolve(); return null; }
          if (!r.ok) throw new Error(r.status);
          return r.json();
        })
        .then(function (j) {
          if (j === null) return;              // locked, handled above
          if (j && j.needsSetup) { locked = true; needsSetup = true; resolve(); return; }
          if (j && j.state) apply(JSON.stringify(j.state));
          locked = false; resolve();
        })
        .catch(function () { tryClaude(); });
    });
  }

  function refresh() {
    if (MODE !== "cloud" || busy || locked) return;
    fetch(API, { headers: cloudHeaders({ accept: "application/json" }) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (j) {
        if (j && j.state) {
          var raw = JSON.stringify(j.state);
          if (raw !== lastSeen && apply(raw)) { saveNote = "Updated with the latest changes."; paintAll(); }
        }
      }).catch(function () { });
  }

  // ---------- lock screen ----------
  function lockUp(msg) {
    locked = true;
    authKey = null;
    try { window.localStorage.removeItem(LSKEY); } catch (e) {}
    paintGate(msg);
  }

  function paintGate(msg) {
    var gate = document.getElementById("gate");
    var app = document.getElementById("app");
    if (!gate) return;
    if (!locked) { gate.style.display = "none"; if (app) app.style.display = ""; return; }
    if (app) app.style.display = "none";
    gate.style.display = "flex";
    var creating = needsSetup;
    gate.innerHTML =
      '<div class="gate-card">' +
      "<h1>Where we are</h1>" +
      (creating
        ? "<p>Set a password for your planner. You\u2019ll both use the same one to get in. " +
          "Pick something you\u2019ll each remember \u2014 there\u2019s no way to look it up later.</p>"
        : "<p>Enter the password you both share.</p>") +
      (msg ? '<p class="gate-msg">' + esc(msg) + "</p>" : "") +
      '<input type="password" id="gate-pw" placeholder="Password" autocomplete="' +
        (creating ? "new-password" : "current-password") + '">' +
      (creating ? '<input type="password" id="gate-pw2" placeholder="Type it again">' : "") +
      '<button class="primary" id="gate-go">' + (creating ? "Set password and open" : "Open the planner") + "</button>" +
      '<p class="gate-note" id="gate-note"></p></div>';
    var pw = document.getElementById("gate-pw");
    if (pw) pw.focus();
  }

  function submitGate() {
    var note = document.getElementById("gate-note");
    var pw = (document.getElementById("gate-pw") || {}).value || "";
    if (pw.length < 4) { if (note) note.textContent = "Use at least four characters."; return; }
    if (needsSetup) {
      var pw2 = (document.getElementById("gate-pw2") || {}).value || "";
      if (pw !== pw2) { if (note) note.textContent = "The two passwords don\u2019t match."; return; }
      if (note) note.textContent = "Setting it up\u2026";
      fingerprint(pw).then(function (fp) {
        return fetch(API, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ setPassword: fp })
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          authKey = fp;
          try { window.localStorage.setItem(LSKEY, fp); } catch (e) {}
          needsSetup = false; locked = false;
          paintGate(); paintAll();
          if (MODE === "cloud") { setInterval(refresh, 45000); window.addEventListener("focus", refresh); }
        });
      }).catch(function () { if (note) note.textContent = "Couldn\u2019t save the password just then. Try again."; });
      return;
    }
    if (note) note.textContent = "Checking\u2026";
    fingerprint(pw).then(function (fp) {
      return fetch(API, { headers: { "x-planner-key": fp, accept: "application/json" } })
        .then(function (r) {
          if (r.status === 401) { if (note) note.textContent = "That password isn\u2019t right. Try again."; return; }
          if (!r.ok) throw new Error(r.status);
          return r.json().then(function (j) {
            authKey = fp;
            try { window.localStorage.setItem(LSKEY, fp); } catch (e) {}
            if (j && j.state) apply(JSON.stringify(j.state));
            locked = false;
            paintGate(); paintAll();
            if (MODE === "cloud") { setInterval(refresh, 45000); window.addEventListener("focus", refresh); }
          });
        });
    }).catch(function () { if (note) note.textContent = "Couldn\u2019t reach the site. Try again in a moment."; });
  }

  // ---------- painting ----------
  function paintSummary() {
    var counts = {}, next = null, today = ymd(new Date()), total = 0;
    var d = new Date(START), guard = 0;
    while (d <= END && guard++ < 500) {
      var s = ymd(d), a = topAct(s);
      if (a && (a.id === "a1" || a.id === "a2" || a.id === "a3")) {
        counts[a.id] = (counts[a.id] || 0) + 1; total++;
        if (!next && s >= today) next = s;
      }
      d.setDate(d.getDate() + 1);
    }
    document.getElementById("sub").textContent =
      state.s.n1 + " in " + state.s.b1 + ". " + state.s.n2 + " in " + state.s.b2 +
      ". July 2026 to July 2027.";
    var html = statCard(total, "days together", null);
    ["a1", "a2", "a3"].forEach(function (id) {
      var a = act(id);
      if (a) html += statCard(counts[id] || 0, actName(a), a);
    });
    html += '<div class="card stat"><span class="n" style="font-size:18px">' +
            (next ? esc(pretty(next)) : "\u2014") + '</span><span class="l">next day together</span></div>';
    document.getElementById("strip").innerHTML = html;
  }
  function statCard(n, label, a) {
    var dot = a ? '<span class="key" style="background:' + a.colour +
      ';width:19px;height:19px;font-size:11px;vertical-align:-4px;margin-right:7px">' + a.shape + "</span>" : "";
    return '<div class="card stat"><span class="n">' + n + '</span><span class="l">' + dot + esc(label) + "</span></div>";
  }

  function paintClashes() {
    var host = document.getElementById("clashes"), cs = live();
    if (!cs.length) { host.innerHTML = '<div class="card none">Nothing clashes at the moment.</div>'; return; }
    host.innerHTML = cs.map(function (c) {
      return '<div class="card clash-card"><h3>' + esc(c.title) + "</h3>" +
        "<p>" + esc(c.why) + "</p>" +
        '<p class="dates">' + (c.days.length > 1 ? c.days.length + " days: " : "") +
        c.days.map(function (d) { return esc(pretty(d)); }).join(" &middot; ") + "</p>" +
        '<button data-dismiss="' + esc(c.id) + '">That\u2019s fine, dismiss it</button> ' +
        '<button data-goto="' + esc(c.days[0]) + '">Show me that day</button></div>';
    }).join("");
  }

  function paintPlanner() {
    var cd = clashDays(), today = ymd(new Date());
    var html = '<table class="year"><thead><tr><th></th>';
    for (var i = 1; i <= 31; i++) html += '<th class="dnum">' + i + "</th>";
    html += "</tr></thead><tbody>";
    var m = new Date(START);
    while (m <= END) {
      var y = m.getFullYear(), mo = m.getMonth();
      html += "<tr><th>" + MON[mo].slice(0, 3) + " " + y + "</th>";
      var dim = new Date(y, mo + 1, 0).getDate();
      for (var day = 1; day <= 31; day++) {
        if (day > dim) { html += '<td class="day"><div class="cell blank"></div></td>'; continue; }
        var s = ymd(new Date(y, mo, day)), dt = parse(s), a = topAct(s), sc = school(s);
        var pickup = isPickupDay(s);
        var cls = ["cell"];
        if (a) cls.push("filled");
        else if (dt.getDay() === 0 || dt.getDay() === 6) cls.push("wknd");
        if (sc.open) cls.push("term");
        if (pickup) cls.push("pickup");
        if (cd[s]) cls.push("clash");
        if (s === today) cls.push("today");
        if (s === selected) cls.push("sel");
        if (s === rangeFrom && s !== selected) cls.push("pending");
        var label = longDate(s) + (pickup ? ", school pickup day" : "") +
                    (a ? ", " + actName(a) : ", nothing planned") +
                    (cd[s] ? ", something clashes" : "");
        html += '<td class="day"><button class="' + cls.join(" ") + '" data-day="' + s + '"' +
          (a ? ' style="background:' + a.colour + '"' : "") +
          ' aria-label="' + esc(label) + '">' + (a ? a.shape : "") + "</button></td>";
      }
      html += "</tr>";
      m = new Date(y, mo + 1, 1);
    }
    document.getElementById("planner").innerHTML = html + "</tbody></table>";

    document.getElementById("legend").innerHTML = "<h3>What the colours mean</h3><ul>" +
      state.acts.map(function (a) {
        return '<li><span class="key" style="background:' + a.colour + '">' + a.shape + "</span>" + esc(actName(a)) + "</li>";
      }).join("") +
      '<li><span class="key pickupkey"></span><strong>School pickup Monday, 3.15pm</strong></li>' +
      '<li><span class="key plain"></span>School open that day</li>' +
      '<li><span class="key clashkey"></span>Something clashes</li></ul>';
    paintPanel();
  }

  function paintPanel() {
    var host = document.getElementById("panel");
    if (!selected) {
      host.innerHTML = '<div class="card panel muted">Tap a day above to see what\u2019s happening, or to add something.</div>';
      return;
    }
    var sc = school(selected), on = plansOn(selected);
    var facts = [];
    if (clashDays()[selected]) {
      facts.push('<strong style="color:var(--alert)">Something clashes on this day \u2014 see ' +
                 "\u201cAnything clashing\u201d at the top of the page.</strong>");
    }
    if (isPickupDay(selected)) facts.push("<strong>School pickup at 3.15pm</strong> \u2014 " + esc(sc.name) + ".");
    else if (sc.open) facts.push("School open \u2014 " + esc(sc.name) + ".");
    else if (sc.name) facts.push("School closed \u2014 " + esc(sc.name) + ".");

    var waiting = (span === -1 && rangeFrom && rangeFrom === selected);
    if (waiting) {
      host.innerHTML = '<div class="card panel"><span class="when">First day chosen</span>' +
        "<h3>" + esc(longDate(selected)) + "</h3>" +
        '<p class="step">Now tap the day it finishes on, up in the calendar.</p>' +
        '<button data-cancelrange="1">Start again</button></div>';
      return;
    }

    var picking = (span === -1 && rangeFrom && rangeFrom !== selected);
    var from = picking ? rangeFrom : selected;
    var to = picking ? selected : (span > 0 ? addDays(selected, span) : selected);
    if (to < from) { var swap = from; from = to; to = swap; }

    var existing = on.map(function (p) {
      var a = act(p.actId);
      return '<div class="on-day"><span class="key" style="background:' + (a ? a.colour : "#999") + '">' +
        (a ? a.shape : "") + '</span><span class="grow">' + esc(actName(a)) +
        (p.start !== p.end ? '<br><span class="m" style="font-family:var(--mono);font-size:14px;color:var(--soft)">' +
          esc(pretty(p.start)) + " to " + esc(pretty(p.end)) + "</span>" : "") +
        '</span><button class="small" data-del="' + esc(p.id) + '">Remove</button></div>';
    }).join("");

    var body =
      (facts.length ? '<ul class="facts"><li>' + facts.join("</li><li>") + "</li></ul>" : "") +
      existing +
      (picking
        ? '<p class="step" style="margin-top:16px">Now choose what\u2019s happening across those ' +
          (Math.round((parse(to) - parse(from)) / 86400000) + 1) + " days</p>"
        : '<p class="step" style="margin-top:16px">1. How many days?</p><div class="lengths">' +
          lenBtn(0, "Just this day") + lenBtn(6, "A week") + lenBtn(13, "A fortnight") +
          lenBtn(-1, "I\u2019ll tap the last day") +
          '</div><p class="step">2. Choose what\u2019s happening</p>') +
      '<div class="choices">' +
        state.acts.map(function (a) {
          return '<button class="card choice" data-put="' + a.id + '" data-from="' + from + '" data-to="' + to + '">' +
            '<span class="key" style="background:' + a.colour + '">' + a.shape + "</span>" +
            "<span>" + esc(actName(a)) + "</span></button>";
        }).join("") +
      "</div>";

    host.innerHTML = '<div class="card panel"><span class="when">' +
      (picking ? "First day to last day" : "Selected day") + '</span><h3>' +
      esc(picking ? longDate(from) + " to " + longDate(to) : longDate(selected)) + "</h3>" + body + "</div>";
  }
  function lenBtn(v, label) {
    return '<button data-span="' + v + '" aria-pressed="' + (span === v) + '">' + label + "</button>";
  }

  function daysTogetherIn(key) {
    var y = +key.slice(0, 4), mo = +key.slice(5, 7) - 1, n = 0;
    var dim = new Date(y, mo + 1, 0).getDate();
    for (var day = 1; day <= dim; day++) {
      var a = topAct(ymd(new Date(y, mo, day)));
      if (a && (a.id === "a1" || a.id === "a2" || a.id === "a3")) n++;
    }
    return n;
  }

  function paintPlans() {
    var host = document.getElementById("plans"), tools = document.getElementById("planTools");
    var ps = state.plans.slice().sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    if (!ps.length) {
      tools.innerHTML = "";
      host.innerHTML = '<div class="none">Nothing planned yet. Tap a day in the calendar above to make a start.</div>';
      return;
    }

    var groups = {}, keys = [];
    ps.forEach(function (p) {
      var k = p.start.slice(0, 7);
      if (!groups[k]) { groups[k] = []; keys.push(k); }
      groups[k].push(p);
    });

    // First time through, open the month you're in - or the next one that has anything in it.
    if (!openInit) {
      openInit = true;
      var now = ymd(new Date()).slice(0, 7);
      var pick = keys.indexOf(now) > -1 ? now : null;
      if (!pick) {
        for (var i = 0; i < keys.length; i++) { if (keys[i] >= now) { pick = keys[i]; break; } }
      }
      if (!pick && keys.length) pick = keys[keys.length - 1];
      if (pick) openMonths[pick] = true;
    }

    var allOpen = keys.every(function (k) { return openMonths[k]; });
    tools.innerHTML =
      '<button class="small" data-months="' + (allOpen ? "close" : "open") + '">' +
      (allOpen ? "Close all months" : "Open all months") + "</button>" +
      '<span class="muted" style="align-self:center;font-size:16px">' + ps.length +
      (ps.length === 1 ? " thing" : " things") + " planned across " + keys.length +
      (keys.length === 1 ? " month" : " months") + "</span>";

    host.innerHTML = keys.map(function (k) {
      var open = !!openMonths[k];
      var y = +k.slice(0, 4), mo = +k.slice(5, 7) - 1;
      var tog = daysTogetherIn(k);
      var rows = groups[k].map(function (p) {
        var a = act(p.actId);
        return '<div class="row-item"><span class="key" style="background:' + (a ? a.colour : "#999") + '">' +
          (a ? a.shape : "") + '</span><span class="grow"><strong>' + esc(actName(a)) + "</strong>" +
          '<br><span class="m">' + esc(pretty(p.start)) +
          (p.end !== p.start ? " to " + esc(pretty(p.end)) : "") + "</span></span>" +
          '<button class="small" data-goto="' + esc(p.start) + '">Show</button>' +
          '<button class="small" data-del="' + esc(p.id) + '">Remove</button></div>';
      }).join("");
      return '<button class="month-row" data-month="' + k + '" aria-expanded="' + open + '">' +
        '<span class="chev">' + (open ? "\u25BE" : "\u25B8") + "</span>" +
        '<span class="mgrow">' + MON[mo] + " " + y +
        '<br><span class="cnt">' + groups[k].length + (groups[k].length === 1 ? " thing" : " things") +
        (tog ? " \u00b7 " + tog + " days together" : "") + "</span></span></button>" +
        (open ? '<div class="month-body">' + rows + "</div>" : "");
    }).join("");
  }

  function paintActs() {
    document.getElementById("acts").innerHTML = state.acts.map(function (a) {
      return '<div class="row-item"><span class="key" style="background:' + a.colour + '">' + a.shape + "</span>" +
        '<span class="grow"><strong>' + esc(actName(a)) + "</strong>" +
        (a.away ? '<br><span class="m">Counts as being away from ' + esc(state.s.b2) + "</span>" : "") + "</span>" +
        (a.fixed ? '<span class="m">built in</span>'
                 : '<button class="small" data-eact="' + a.id + '">Change</button>' +
                   '<button class="small" data-dact="' + a.id + '">Remove</button>') + "</div>";
    }).join("");

    var host = document.getElementById("actForm");
    if (!showActForm) {
      host.innerHTML = '<button class="primary" data-newact="1" style="margin-top:12px">Add your own activity</button>';
      return;
    }
    var a = editingAct || { name: "", colour: "", shape: "", away: false };
    var used = state.acts.map(function (x) { return x.colour; });
    host.innerHTML = '<div class="card form" style="margin-top:12px">' +
      '<div class="fld"><label for="a-name">What do you want to call it?</label>' +
      '<input id="a-name" value="' + esc(a.name || "") + '" placeholder="Bowls club"></div>' +
      '<div class="fld"><label>Pick a colour</label><div class="swatches">' +
      PALETTE.map(function (c) {
        var taken = used.indexOf(c) > -1 && c !== a.colour;
        return '<button class="sw' + (taken ? " used" : "") + '" data-colour="' + c + '" style="background:' + c +
          '" aria-pressed="' + (a.colour === c) + '" aria-label="Colour' + (taken ? ", already used" : "") + '">' +
          (taken ? "\u2713" : "") + "</button>";
      }).join("") + "</div></div>" +
      '<div class="fld"><label>Pick a shape</label><div class="swatches">' +
      SHAPES.map(function (sh) {
        return '<button class="sw" data-shape="' + sh + '" style="background:' + (a.colour || "#7C8783") +
          '" aria-pressed="' + (a.shape === sh) + '">' + sh + "</button>";
      }).join("") + "</div></div>" +
      '<div class="fld"><label for="a-away">Does this take ' + esc(state.s.n2) + " away from " + esc(state.s.b2) + "?</label>" +
      '<select id="a-away"><option value="no"' + (a.away ? "" : " selected") + ">No, she\u2019s still there</option>" +
      '<option value="yes"' + (a.away ? " selected" : "") + '>Yes \u2014 warn me if it lands on a school Monday</option></select></div>' +
      '<p class="warn" id="a-warn" hidden></p>' +
      '<button class="primary" id="a-save">' + (editingAct && editingAct.id ? "Save changes" : "Add this activity") + "</button> " +
      '<button id="a-cancel">Cancel</button></div>';
  }

  function paintSettings() {
    document.getElementById("settings").innerHTML =
      '<div class="fld"><label for="s-n1">Your name</label><input id="s-n1" value="' + esc(state.s.n1) + '"></div>' +
      '<div class="fld"><label for="s-b1">Where you live</label><input id="s-b1" value="' + esc(state.s.b1) + '"></div>' +
      '<div class="fld"><label for="s-n2">Her name</label><input id="s-n2" value="' + esc(state.s.n2) + '"></div>' +
      '<div class="fld"><label for="s-b2">Where she lives</label><input id="s-b2" value="' + esc(state.s.b2) + '"></div>' +
      '<button class="primary" id="s-save">Save these</button>';
  }

  function paintFoot() {
    var where = MODE === "cloud"
      ? "Live on your Cloudflare site: you\u2019re both looking at the same plans."
      : MODE === "shared"
        ? "Running in the Claude app: plans are shared, so you both see the same page."
        : MODE === "local"
          ? "Running from a file on this computer: plans are saved here only."
          : "This browser is blocking storage, so nothing can be kept.";
    document.getElementById("foot").innerHTML =
      '<span class="status"><strong>' + esc(saveNote) + "</strong></span>" + esc(where) + "<br>" +
      "School dates are Rothwell Primary School for 2026/27 \u2014 Leeds City Council terms plus the school\u2019s five training days.";
  }

  function paintAll() {
    paintSummary(); paintClashes(); paintPlanner(); paintPlans(); paintActs(); paintSettings(); paintFoot();
  }

  // ---------- events ----------
  document.getElementById("app").addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("button") : null;
    if (!t) return;

    if (t.dataset.day) {
      var d = t.dataset.day;
      if (span === -1 && rangeFrom && rangeFrom !== d) selected = d;
      else if (span === -1 && !rangeFrom) { rangeFrom = d; selected = d; }
      else if (selected === d) { selected = null; span = 0; rangeFrom = null; }
      else { selected = d; rangeFrom = null; }
      paintPlanner();
      return;
    }
    if (t.dataset.month) {
      openMonths[t.dataset.month] = !openMonths[t.dataset.month];
      paintPlans(); return;
    }
    if (t.dataset.months) {
      var wantOpen = t.dataset.months === "open";
      openMonths = {};
      if (wantOpen) {
        state.plans.forEach(function (p) { openMonths[p.start.slice(0, 7)] = true; });
      }
      paintPlans(); return;
    }
    if (t.dataset.goto) { selected = t.dataset.goto; rangeFrom = null; span = 0; paintPlanner(); return; }
    if (t.dataset.span !== undefined) {
      span = +t.dataset.span;
      rangeFrom = (span === -1) ? selected : null;
      paintPanel(); return;
    }
    if (t.dataset.cancelrange) { rangeFrom = null; span = 0; paintPlanner(); return; }

    if (t.dataset.put) {
      state.plans.push({ id: "p" + Date.now(), actId: t.dataset.put, start: t.dataset.from, end: t.dataset.to });
      rangeFrom = null; span = 0;
      save(); paintAll(); return;
    }
    if (t.dataset.del) {
      state.plans = state.plans.filter(function (p) { return p.id !== t.dataset.del; });
      save(); paintAll(); return;
    }
    if (t.dataset.dismiss) { state.dismissed[t.dataset.dismiss] = true; save(); paintAll(); return; }

    if (t.dataset.newact) { editingAct = null; showActForm = true; busy = true; paintActs(); return; }
    if (t.dataset.eact) {
      var found = act(t.dataset.eact);
      editingAct = found ? Object.assign({}, found) : null;
      showActForm = true; busy = true; paintActs(); return;
    }
    if (t.dataset.dact) {
      state.plans = state.plans.filter(function (p) { return p.actId !== t.dataset.dact; });
      state.acts = state.acts.filter(function (a) { return a.id !== t.dataset.dact; });
      save(); paintAll(); return;
    }
    if (t.dataset.colour || t.dataset.shape) {
      editingAct = editingAct || { name: "", colour: "", shape: "", away: false };
      var nameEl = document.getElementById("a-name"), awayEl = document.getElementById("a-away");
      if (nameEl) editingAct.name = nameEl.value;
      if (awayEl) editingAct.away = awayEl.value === "yes";
      if (t.dataset.colour) editingAct.colour = t.dataset.colour;
      if (t.dataset.shape) editingAct.shape = t.dataset.shape;
      paintActs(); return;
    }
    if (t.id === "a-cancel") { showActForm = false; editingAct = null; busy = false; paintActs(); return; }
    if (t.id === "a-save") {
      var name = document.getElementById("a-name").value.trim();
      var warn = document.getElementById("a-warn");
      var draft = editingAct || {};
      if (!name) { warn.hidden = false; warn.textContent = "Give it a name, then try again."; return; }
      if (!draft.colour) { warn.hidden = false; warn.textContent = "Pick a colour, then try again."; return; }
      if (!draft.shape) { warn.hidden = false; warn.textContent = "Pick a shape, then try again."; return; }
      var rec = {
        id: draft.id || ("c" + Date.now()),
        name: name, colour: draft.colour, shape: draft.shape,
        away: document.getElementById("a-away").value === "yes"
      };
      if (draft.id) state.acts = state.acts.map(function (x) { return x.id === rec.id ? rec : x; });
      else state.acts.push(rec);
      showActForm = false; editingAct = null; busy = false;
      save(); paintAll(); return;
    }
    if (t.id === "s-save") {
      state.s = {
        n1: document.getElementById("s-n1").value.trim() || "Me",
        b1: document.getElementById("s-b1").value.trim() || "home",
        n2: document.getElementById("s-n2").value.trim() || "My partner",
        b2: document.getElementById("s-b2").value.trim() || "Rothwell"
      };
      save(); paintAll(); return;
    }
  });

  // Lock screen lives outside #app, so it needs its own listeners.
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("button") : null;
    if (b && b.id === "gate-go") { submitGate(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    var g = document.getElementById("gate");
    if (g && g.style.display !== "none" &&
        e.target && (e.target.id === "gate-pw" || e.target.id === "gate-pw2")) {
      submitGate();
    }
  });

  function start() {
    load().then(function () {
      saveNote = "";
      if (locked) { paintGate(); return; }   // hosted + password required
      try { paintAll(); } catch (e) { fail(e); }
      if (MODE === "cloud") {
        setInterval(refresh, 45000);
        window.addEventListener("focus", refresh);
      }
    }, fail);
  }
  function fail(e) {
    var el = document.getElementById("sub");
    if (el) el.textContent = "Something went wrong opening the page: " + (e && e.message ? e.message : e);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
</script>
</body>
</html>
