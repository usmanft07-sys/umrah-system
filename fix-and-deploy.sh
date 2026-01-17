#!/bin/bash

# ============================================
# UmrahFlex - Complete Fix and Deployment
# ============================================

set -e  # Exit on error

echo "═══════════════════════════════════════════════════════════"
echo "🔧 UmrahFlex - Fixing and Deploying All Pages"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

REPO_DIR="$HOME/landing-repo"
WEB_DIR="/var/www/umrahflex"

# ============================================
# Step 1: Pull Latest from GitHub
# ============================================
echo -e "${YELLOW}📥 Step 1: Pulling latest from GitHub...${NC}"

cd "$REPO_DIR"
git pull --rebase

echo -e "${GREEN}✓ Pulled latest changes${NC}"
echo ""

# ============================================
# Step 2: Backup Current Files
# ============================================
echo -e "${YELLOW}💾 Step 2: Creating backup...${NC}"

sudo mkdir -p "$WEB_DIR/_backup/$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$WEB_DIR/_backup/$(date +%Y%m%d-%H%M%S)"

for file in admin-panel.html packages.html team.html offices.html inbox.html api-service.js; do
    if [ -f "$WEB_DIR/$file" ]; then
        sudo cp "$WEB_DIR/$file" "$BACKUP_DIR/" 2>/dev/null || true
        echo "  ✓ Backed up: $file"
    fi
done

echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}"
echo ""

# ============================================
# Step 3: Deploy Functional Files
# ============================================
echo -e "${YELLOW}📤 Step 3: Deploying functional files...${NC}"

cd "$REPO_DIR"

# Copy and rename to simple names
sudo cp -f api-service.js "$WEB_DIR/"
sudo cp -f admin-panel-functional.html "$WEB_DIR/admin-panel.html"
sudo cp -f packages-functional.html "$WEB_DIR/packages.html"
sudo cp -f team-management.html "$WEB_DIR/team.html"
sudo cp -f office-management.html "$WEB_DIR/offices.html"

echo "  ✓ Deployed: api-service.js"
echo "  ✓ Deployed: admin-panel.html (functional)"
echo "  ✓ Deployed: packages.html (functional)"
echo "  ✓ Deployed: team.html"
echo "  ✓ Deployed: offices.html"

# ============================================
# Step 4: Fix inbox.html API URL
# ============================================
echo -e "${YELLOW}🔧 Step 4: Fixing inbox.html API URL...${NC}"

# Check if inbox.html has localhost
if grep -q "localhost:3000" "$REPO_DIR/inbox.html" 2>/dev/null; then
    echo "  ⚠️  inbox.html uses localhost - fixing..."
    sudo sed -i "s|http://localhost:3000/api|https://api.umrahflex.com/api|g" "$REPO_DIR/inbox.html"
    sudo cp -f "$REPO_DIR/inbox.html" "$WEB_DIR/"
    echo "  ✓ Fixed and deployed: inbox.html"
else
    # Just copy as-is
    sudo cp -f "$REPO_DIR/inbox.html" "$WEB_DIR/" 2>/dev/null || true
    echo "  ✓ Deployed: inbox.html"
fi

echo -e "${GREEN}✓ All files deployed${NC}"
echo ""

# ============================================
# Step 5: Set Correct Permissions
# ============================================
echo -e "${YELLOW}🔐 Step 5: Setting permissions...${NC}"

sudo chown caddy:caddy "$WEB_DIR"/*.html "$WEB_DIR"/*.js 2>/dev/null || true
sudo chmod 644 "$WEB_DIR"/*.html "$WEB_DIR"/*.js 2>/dev/null || true

echo -e "${GREEN}✓ Permissions set${NC}"
echo ""

# ============================================
# Step 6: Reload Caddy
# ============================================
echo -e "${YELLOW}🔄 Step 6: Reloading Caddy...${NC}"

if sudo systemctl reload caddy; then
    echo -e "${GREEN}✓ Caddy reloaded successfully${NC}"
else
    echo -e "${RED}✗ Failed to reload Caddy${NC}"
    exit 1
fi

echo ""

# ============================================
# Step 7: Verify Deployment
# ============================================
echo -e "${YELLOW}🔍 Step 7: Verifying deployment...${NC}"

echo ""
echo "Deployed files:"
ls -lah "$WEB_DIR" | grep -E "(admin-panel|packages|team|offices|inbox|api-service)" | grep -v "_backup"

echo ""

# ============================================
# Step 8: Test URLs
# ============================================
echo -e "${YELLOW}🌐 Step 8: Testing URLs...${NC}"

URLS=(
    "https://app.umrahflex.com/api-service.js"
    "https://app.umrahflex.com/admin-panel.html"
    "https://app.umrahflex.com/packages.html"
    "https://app.umrahflex.com/team.html"
    "https://app.umrahflex.com/offices.html"
    "https://app.umrahflex.com/inbox.html"
)

echo ""
for url in "${URLS[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$status" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} $url"
    else
        echo -e "  ${RED}✗${NC} $url (HTTP $status)"
    fi
done

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "🌐 Access your pages:"
echo ""
echo "  Dashboard:   https://app.umrahflex.com/admin-panel.html"
echo "  Packages:    https://app.umrahflex.com/packages.html"
echo "  Team:        https://app.umrahflex.com/team.html"
echo "  Offices:     https://app.umrahflex.com/offices.html"
echo "  Inbox:       https://app.umrahflex.com/inbox.html"
echo ""
echo "📦 Backup location: $BACKUP_DIR"
echo ""
echo "🧪 Test Steps:"
echo "  1. Open each URL in browser"
echo "  2. Press Ctrl+Shift+R (hard refresh)"
echo "  3. Check F12 console for errors"
echo "  4. Test Add/Edit/Delete operations"
echo ""
echo "═══════════════════════════════════════════════════════════"
