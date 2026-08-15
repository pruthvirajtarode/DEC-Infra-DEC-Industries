const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const virtualConsole = new jsdom.VirtualConsole();

virtualConsole.on("error", (err) => {
  console.error("Browser Error:", err);
});

virtualConsole.on("jsdomError", (err) => {
  console.error("JSDOM Error:", err.message, err.detail);
});

virtualConsole.on("log", (log) => {
  console.log("Console Log:", log);
});

const html = fs.readFileSync('index.html', 'utf-8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  virtualConsole
});

dom.window.addEventListener("load", () => {
    console.log("Load event fired");
    setTimeout(() => process.exit(0), 1000);
});




