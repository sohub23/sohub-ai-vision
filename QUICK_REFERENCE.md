# 🚀 SOHUB AI Vision - Quick Reference Guide

## ✅ System Status Check

### Check if email server is running:
```bash
pm2 status sohub-ai-vision
```

### View live logs:
```bash
pm2 logs sohub-ai-vision
```

### Check last 50 log lines:
```bash
pm2 logs sohub-ai-vision --lines 50 --nostream
```

---

## 🔄 Server Management

### Restart email server:
```bash
pm2 restart sohub-ai-vision
```

### Stop email server:
```bash
pm2 stop sohub-ai-vision
```

### Start email server (if stopped):
```bash
pm2 start sohub-ai-vision
```

### Reload server (zero downtime):
```bash
pm2 reload sohub-ai-vision
```

---

## 🧪 Testing Email System

### Test API endpoint:
```bash
curl -X POST https://ai.sohub.com.bd/api/send-order \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "01700000000",
    "email": "test@example.com",
    "location": "Dhaka",
    "machineType": "AI Vision Edge Engine — 4 Channels",
    "quantity": 1,
    "addOns": [],
    "totalPrice": 95000,
    "unitPrice": 95000,
    "productType": "edge-engine"
  }'
```

Expected response:
```json
{"success":true,"message":"Your request has been sent successfully."}
```

---

## 🐛 Troubleshooting

### Problem: Emails not sending

**Step 1:** Check if server is running
```bash
pm2 status sohub-ai-vision
```

**Step 2:** Check logs for errors
```bash
pm2 logs sohub-ai-vision --err --lines 50
```

**Step 3:** Restart server
```bash
pm2 restart sohub-ai-vision
```

**Step 4:** Test API directly
```bash
curl -X POST http://localhost:5000/api/send-order -H "Content-Type: application/json" -d '{"name":"Test","phone":"01700000000","location":"Dhaka","productType":"edge-engine","machineType":"Test","quantity":1,"addOns":[],"totalPrice":95000,"unitPrice":95000}'
```

---

### Problem: Server not starting

**Check Node.js version:**
```bash
node --version
```
(Should be v18 or higher)

**Check if port 5000 is available:**
```bash
lsof -i :5000
```

**Manually start server for debugging:**
```bash
cd /var/www/html/websites/ai.sohub.com.bd/server
node index.js
```

---

### Problem: Apache not proxying to Node.js

**Check Apache config:**
```bash
cat /etc/apache2/sites-available/ai.sohub.com.bd-le-ssl.conf | grep -A 4 "Node.js"
```

**Test Apache config:**
```bash
apachectl configtest
```

**Restart Apache:**
```bash
systemctl restart apache2
```

---

## 📧 Email Configuration

### SMTP Settings (in .env file):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sohub.web@gmail.com
SMTP_PASS=kjaj ghzt shff anhs
ADMIN_EMAIL=hello@sohub.com.bd
```

### Update email credentials:
```bash
nano /var/www/html/websites/ai.sohub.com.bd/.env
```

After updating, restart server:
```bash
pm2 restart sohub-ai-vision
```

---

## 📊 Monitoring

### Check server uptime:
```bash
pm2 info sohub-ai-vision
```

### Monitor CPU and memory:
```bash
pm2 monit
```

### View all PM2 processes:
```bash
pm2 list
```

---

## 🔐 Security

### Important files to protect:
- `.env` - Contains SMTP credentials
- `server/index.js` - Main server file
- `server/pdfGenerator.js` - PDF generation logic

### Never commit to Git:
- `.env`
- `node_modules/`
- `dist/`
- `*.log`

---

## 📱 Contact Information

**Admin Email:** hello@sohub.com.bd
**Website:** https://ai.sohub.com.bd
**Server Location:** /var/www/html/websites/ai.sohub.com.bd

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Check status
pm2 status sohub-ai-vision

# View logs
pm2 logs sohub-ai-vision

# Restart
pm2 restart sohub-ai-vision

# Test API
curl -X POST https://ai.sohub.com.bd/api/send-order -H "Content-Type: application/json" -d '{"name":"Test","phone":"01700000000","location":"Dhaka","productType":"edge-engine","machineType":"Test","quantity":1,"addOns":[],"totalPrice":95000,"unitPrice":95000}'

# Check Apache
systemctl status apache2

# Restart Apache
systemctl restart apache2
```

---

**Last Updated:** March 11, 2026
**Status:** ✅ FULLY OPERATIONAL
