// Simple Node.js HTTP Server for TotalWine Clone
// Usage: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const HOST = 'localhost';

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
    '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Default to index.html if root is requested
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Construct file path
    const filePath = path.join(__dirname, pathname);

    // Get file extension
    const ext = path.extname(filePath).toLowerCase();

    // Read the file from the file system
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // File not found
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Not Found</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; }
                            h1 { color: #8B4513; }
                            p { color: #666; }
                            a { color: #8B4513; text-decoration: none; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Page Not Found</h1>
                        <p>Sorry, the requested file could not be found.</p>
                        <p><a href="/">← Go Home</a></p>
                    </body>
                    </html>
                `);
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Server Error</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; }
                            h1 { color: #da291c; }
                            p { color: #666; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - Server Error</h1>
                        <p>An error occurred while processing your request.</p>
                    </body>
                    </html>
                `);
            }
            return;
        }

        // Set the content type
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        
        // Add CORS headers for local development
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Send the file
        res.end(data);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════╗
║     🍷 TotalWine Clone Server          ║
╚════════════════════════════════════════╝

✓ Server running at: http://${HOST}:${PORT}
✓ Open this URL in your browser

📁 Serving files from: ${__dirname}

📝 Accessible files:
   - index.html
   - styles.css
   - script.js
   - /images/

Press Ctrl+C to stop the server

    `);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n✓ Server stopped');
    process.exit(0);
});
