async function run() {
  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/api/',
    'http://localhost:3000/api/property',
    'http://localhost:3000/api/services'
  ];
  for (const u of urls) {
    try {
      const resp = await fetch(u);
      console.log(`${u}: ${resp.status} ${await resp.text()}`);
    } catch(e) {
      console.log(`${u}: FAILED`);
    }
  }
}
run();
