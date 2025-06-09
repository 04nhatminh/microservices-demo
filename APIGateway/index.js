const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Proxy tới UserService (.NET)
app.use('/api/user', createProxyMiddleware({
    target: 'http://localhost:5034',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: { '^/api/user': '/api/user' },
    proxyTimeout: 5000, // Thêm timeout cho an toàn
    onProxyReq: (proxyReq, req, res) => {
        // Nếu request có body, phải handle lại Content-Length chính xác
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
}));

// Proxy tới PostService (NodeJS)
app.use('/api/posts', createProxyMiddleware({
    target: 'http://localhost:3002', // Port của PostService
    changeOrigin: true,
    pathRewrite: { '^/api/posts': '' },
    onProxyReq: (proxyReq, req, res) => {
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
}));

// Proxy tới CommentService (NodeJS)
app.use('/api/comments', createProxyMiddleware({
    target: 'http://localhost:3001', // Port của CommentService
    changeOrigin: true,
    pathRewrite: { '^/api/comments': '' },
    onProxyReq: (proxyReq, req, res) => {
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
}));

const PORT = 4000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));