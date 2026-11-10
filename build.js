// Builds index.html (the standalone website) from malice-and-mortar.html (the game source).
// Run: node build.js
const fs = require("fs");
const src = fs.readFileSync("malice-and-mortar.html", "utf8").replace(/\r\n/g, "\n");
const cut = src.indexOf("<style>");
const end = src.indexOf("</style>") + "</style>".length;
const head = src.slice(0, end);   // title, font link, styles
const body = src.slice(end);      // markup and script
const desc = "An idle game of cheerful villainy: start as a damp imp in a hole and grow into an overlord with a castle of unreasonable size.";
if (cut < 0 || end < 8) throw new Error("Could not find the <style> block in the source.");
const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="${desc}">
<meta property="og:title" content="Malice &amp; Mortar">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://kmortensenf.github.io/malice-and-mortar/">
<meta property="og:image" content="https://kmortensenf.github.io/malice-and-mortar/preview.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#15101c">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%2315101c'/%3E%3Cpath d='M14 22 6 8l16 8zM50 22l8-14-16 8z' fill='%23e8dcc0'/%3E%3Cpath d='M10 34 2 26l10-2zM54 34l8-8-10-2z' fill='%238c2f39'/%3E%3Ccircle cx='32' cy='36' r='22' fill='%238c2f39'/%3E%3Cellipse cx='23' cy='32' rx='5' ry='6.5' fill='%23ffcf5a'/%3E%3Cellipse cx='41' cy='32' rx='5' ry='6.5' fill='%23ffcf5a'/%3E%3Crect x='22' y='27' width='2' height='10' fill='%231a0d10'/%3E%3Crect x='40' y='27' width='2' height='10' fill='%231a0d10'/%3E%3Cpath d='M20 45q12 10 24 0' stroke='%23f3ead6' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E">
<style>html{color-scheme:dark}body{margin:0}img{max-width:100%}</style>
${head}
</head>
<body>
${body.trim()}
</body>
</html>
`;
fs.writeFileSync("index.html", out);
console.log("Built index.html (" + out.length + " characters)");
