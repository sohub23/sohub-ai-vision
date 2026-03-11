#!/bin/bash

# SOHUB AI Vision - Health Check Script
# This script checks if the email server is running properly

echo "🔍 SOHUB AI Vision - Health Check"
echo "=================================="
echo ""

# Check 1: PM2 Process Status
echo "1️⃣ Checking Node.js Server..."
if pm2 status sohub-ai-vision | grep -q "online"; then
    echo "   ✅ Server is ONLINE"
else
    echo "   ❌ Server is DOWN - Attempting restart..."
    pm2 restart sohub-ai-vision
    sleep 3
    if pm2 status sohub-ai-vision | grep -q "online"; then
        echo "   ✅ Server restarted successfully"
    else
        echo "   ❌ CRITICAL: Server failed to restart!"
        exit 1
    fi
fi
echo ""

# Check 2: Apache Status
echo "2️⃣ Checking Apache..."
if systemctl is-active --quiet apache2; then
    echo "   ✅ Apache is RUNNING"
else
    echo "   ❌ Apache is DOWN"
    exit 1
fi
echo ""

# Check 3: Port 5000 Listening
echo "3️⃣ Checking Port 5000..."
if lsof -i :5000 | grep -q LISTEN; then
    echo "   ✅ Port 5000 is LISTENING"
else
    echo "   ❌ Port 5000 is NOT listening"
    exit 1
fi
echo ""

# Check 4: API Endpoint Test
echo "4️⃣ Testing API Endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:5000/api/send-order \
  -H "Content-Type: application/json" \
  -d '{"name":"Health Check","phone":"01700000000","location":"Test","productType":"edge-engine","machineType":"Test","quantity":1,"addOns":[],"totalPrice":95000,"unitPrice":95000}' \
  --max-time 10)

if echo "$RESPONSE" | grep -q "success"; then
    echo "   ✅ API is RESPONDING correctly"
else
    echo "   ❌ API is NOT responding properly"
    echo "   Response: $RESPONSE"
    exit 1
fi
echo ""

# Check 5: Disk Space
echo "5️⃣ Checking Disk Space..."
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 90 ]; then
    echo "   ✅ Disk space OK ($DISK_USAGE% used)"
else
    echo "   ⚠️  WARNING: Disk space is $DISK_USAGE% used"
fi
echo ""

# Check 6: Memory
echo "6️⃣ Checking Memory..."
MEMORY_USAGE=$(free | awk 'NR==2 {printf "%.0f", $3/$2 * 100}')
if [ "$MEMORY_USAGE" -lt 90 ]; then
    echo "   ✅ Memory OK ($MEMORY_USAGE% used)"
else
    echo "   ⚠️  WARNING: Memory is $MEMORY_USAGE% used"
fi
echo ""

# Check 7: Recent Errors
echo "7️⃣ Checking Recent Errors..."
ERROR_COUNT=$(pm2 logs sohub-ai-vision --err --lines 50 --nostream 2>/dev/null | wc -l)
if [ "$ERROR_COUNT" -eq 0 ]; then
    echo "   ✅ No recent errors"
else
    echo "   ⚠️  Found $ERROR_COUNT error lines in recent logs"
fi
echo ""

# Summary
echo "=================================="
echo "✅ Health Check PASSED"
echo "📧 Email system is OPERATIONAL"
echo "🕐 Checked at: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=================================="
