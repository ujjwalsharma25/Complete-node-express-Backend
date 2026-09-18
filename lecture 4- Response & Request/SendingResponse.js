const http = require('http');
const server = http.createServer((req, res) => {
  // res.setheader('Content-Type', 'json');
  res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Welcome to Home</h1></body>');
    res.write('</html>');
    res.end();
});
// const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
