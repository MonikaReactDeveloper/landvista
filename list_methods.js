const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');
const modules = fs.readdirSync(modulesDir).filter(f => fs.statSync(path.join(modulesDir, f)).isDirectory());

const report = {};

modules.forEach(mod => {
  const modPath = path.join(modulesDir, mod);
  const files = fs.readdirSync(modPath).filter(f => f.endsWith('.routes.js'));
  
  if (files.length === 0) return;
  
  const content = fs.readFileSync(path.join(modPath, files[0]), 'utf-8');
  
  report[mod] = {
    hasGet: /router\.get\(/i.test(content),
    hasPost: /router\.post\(/i.test(content),
    hasPut: /router\.put\(/i.test(content),
    hasDelete: /router\.delete\(/i.test(content),
  };
});

console.table(report);
