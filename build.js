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
<meta name="theme-color" content="#15101c">
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
