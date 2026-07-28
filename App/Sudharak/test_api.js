const https = require('http');

https.get('http://65.2.186.163/ai/feed', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed.data[0] || parsed.DATA[0], null, 2));
    } catch(e) {
      console.log(data);
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
