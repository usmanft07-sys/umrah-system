# 🔧 UmrahFlex - Complete Fix Guide

## ❌ Problems Found:

### 1. **inbox.html Using Localhost API**
```javascript
// Wrong:
const API_URL = 'http://localhost:3000/api';

// Fixed:
const API_URL = 'https://api.umrahflex.com/api';
```

### 2. **File Naming Confusion**
Files in GitHub: `team-management.html`, `office-management.html`
Files on VPS: `team.html`, `offices.html`

When copying, wrong files were being used!

### 3. **Browser Cache**
Old JavaScript cached in browser.

---

## ✅ Complete Fix (One Command):

### Step 1: Upload Script to VPS

```bash
# Copy fix-and-deploy.sh to VPS
scp fix-and-deploy.sh umrah@77.42.83.42:~/
```

### Step 2: Run on VPS

```bash
# SSH into VPS
ssh umrah@77.42.83.42

# Make executable
chmod +x ~/fix-and-deploy.sh

# Run script
~/fix-and-deploy.sh
```

**Script will:**
- ✅ Pull latest from GitHub
- ✅ Backup current files
- ✅ Deploy all functional pages with correct names
- ✅ Fix inbox.html API URL
- ✅ Set permissions
- ✅ Reload Caddy
- ✅ Verify all URLs

---

## 🧪 After Deployment:

### 1. Clear Browser Cache
```
Ctrl + Shift + Delete
Select: Cached images and files
Time range: All time
Clear data
```

### 2. Hard Refresh Each Page
```
Ctrl + Shift + R  (on each page)
```

### 3. Test in Browser

**Dashboard** - `https://app.umrahflex.com/admin-panel.html`
- [ ] Shows real stats (Packages: 2, Team: 6, Offices: 3)
- [ ] Charts render
- [ ] No console errors

**Packages** - `https://app.umrahflex.com/packages.html`
- [ ] Shows 2 packages
- [ ] Add/Edit/Delete works
- [ ] No console errors

**Team** - `https://app.umrahflex.com/team.html`
- [ ] Shows 6 team members
- [ ] Add/Edit/Delete works
- [ ] No console errors

**Offices** - `https://app.umrahflex.com/offices.html`
- [ ] Shows 3 offices
- [ ] Add/Edit/Delete works
- [ ] No console errors

**Inbox** - `https://app.umrahflex.com/inbox.html`
- [ ] Shows leads (if any)
- [ ] Status updates work
- [ ] No localhost errors

---

## 🐛 If Still Not Working:

### Check 1: Browser Console (F12)
```
Look for:
- CORS errors
- 404 Not Found
- API call errors
- JavaScript errors
```

### Check 2: VPS Files
```bash
# Check file timestamps
ls -lah /var/www/umrahflex/*.html

# Should all be recent (today's date)
```

### Check 3: API Endpoints
```bash
# Test API calls
curl https://api.umrahflex.com/api/teams
curl https://api.umrahflex.com/api/offices
curl https://api.umrahflex.com/api/leads

# Should return JSON data
```

### Check 4: Caddy Status
```bash
sudo systemctl status caddy
```

---

## 📋 File Structure After Fix:

```
/var/www/umrahflex/
├── api-service.js        ← API library (16KB)
├── admin-panel.html      ← Dashboard functional (17KB)
├── packages.html         ← Packages functional (31KB)
├── team.html             ← Team management (22KB)
├── offices.html          ← Office management (18KB)
├── inbox.html            ← Inbox (FIXED API URL)
└── index.html            ← Homepage
```

---

## 🎯 URLs After Fix:

```
✅ https://app.umrahflex.com/admin-panel.html  (Dashboard)
✅ https://app.umrahflex.com/packages.html     (Packages)
✅ https://app.umrahflex.com/team.html         (Team)
✅ https://app.umrahflex.com/offices.html      (Offices)
✅ https://app.umrahflex.com/inbox.html        (Inbox - FIXED)
```

---

## 💡 Why This Fixes Everything:

1. **inbox.html** - Now uses production API instead of localhost
2. **team.html** - Correctly deployed from team-management.html (functional version)
3. **offices.html** - Correctly deployed from office-management.html (functional version)
4. **Browser cache** - Hard refresh clears old JavaScript
5. **File names** - Script handles naming automatically

---

## 🔄 Future Updates:

Use the same script:
```bash
ssh umrah@77.42.83.42
~/fix-and-deploy.sh
```

Automatically:
- Pulls from GitHub
- Creates backup
- Deploys with correct names
- Tests all URLs

---

## ✅ Success Indicators:

After running script and clearing browser cache:

1. ✅ All 5 pages load (Dashboard, Packages, Team, Offices, Inbox)
2. ✅ Data displays from database
3. ✅ Add/Edit/Delete operations work
4. ✅ No console errors (F12)
5. ✅ Mobile responsive
6. ✅ Charts render on dashboard

---

**Last Updated:** January 17, 2026
**Version:** Complete Fix v1.0
