# 🚀 UmrahFlex CRM - Functional Pages Deployment Guide

## 📦 What's Included

### ✅ Functional Pages (Database-Connected)
1. **api-service.js** - API service library for all pages
2. **admin-panel-functional.html** - Live dashboard with real stats
3. **packages-functional.html** - Full package CRUD management
4. **team-management.html** - Team member management
5. **office-management.html** - Office location management

### 🎯 Features

#### API Service (api-service.js)
- ✅ Complete API wrapper for all endpoints
- ✅ Error handling and success notifications
- ✅ Utility functions (loading, formatting, etc.)
- ✅ Supports: Packages, Teams, Offices, Leads

#### Packages Management
- ✅ Add/Edit/Delete packages
- ✅ Filter by airport, month, status
- ✅ Complete pricing management
- ✅ Flight details with layover info
- ✅ Hotel distance tracking

#### Team Management
- ✅ Add/Edit/Delete team members
- ✅ Role-based management (admin, manager, sales, support)
- ✅ Daily leads limit configuration
- ✅ Performance metrics display
- ✅ Office assignment

#### Office Management
- ✅ Add/Edit/Delete offices
- ✅ Multiple city support
- ✅ Manager and contact info
- ✅ Active/Inactive status

#### Dashboard
- ✅ Real-time statistics from database
- ✅ Animated counters
- ✅ Chart.js visualizations
- ✅ Lead distribution charts
- ✅ Quick action links

---

## 🔧 Deployment Steps

### Step 1: Upload API Service
```bash
# SSH into your server
ssh umrah@77.42.83.42

# Copy api-service.js to web directory
sudo cp api-service.js /var/www/umrahflex/
sudo chown caddy:caddy /var/www/umrahflex/api-service.js
sudo chmod 644 /var/www/umrahflex/api-service.js
```

### Step 2: Upload Functional Pages
```bash
# Copy all functional HTML files
sudo cp admin-panel-functional.html /var/www/umrahflex/
sudo cp packages-functional.html /var/www/umrahflex/
sudo cp team-management.html /var/www/umrahflex/
sudo cp office-management.html /var/www/umrahflex/

# Set correct permissions
sudo chown caddy:caddy /var/www/umrahflex/*.html
sudo chmod 644 /var/www/umrahflex/*.html
```

### Step 3: Reload Caddy
```bash
sudo systemctl reload caddy
```

### Step 4: Verify Deployment
```bash
# Check files are in place
ls -lah /var/www/umrahflex/

# Test API service
curl https://app.umrahflex.com/api-service.js

# Test pages
curl -I https://app.umrahflex.com/admin-panel-functional.html
curl -I https://app.umrahflex.com/packages-functional.html
curl -I https://app.umrahflex.com/team-management.html
curl -I https://app.umrahflex.com/office-management.html
```

---

## 🌐 Access URLs

After deployment, access these URLs:

```
Dashboard:   https://app.umrahflex.com/admin-panel-functional.html
Packages:    https://app.umrahflex.com/packages-functional.html
Team:        https://app.umrahflex.com/team-management.html
Offices:     https://app.umrahflex.com/office-management.html
Inbox:       https://app.umrahflex.com/inbox.html (existing)
```

---

## 🔍 Backend API Endpoints Required

Your backend API must support these endpoints:

### Packages
- `GET    /api/packages` - Get all packages
- `GET    /api/packages/:id` - Get single package
- `POST   /api/packages` - Create package
- `PUT    /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

### Teams
- `GET    /api/teams` - Get all team members
- `GET    /api/teams/:id` - Get single team member
- `POST   /api/teams` - Create team member
- `PUT    /api/teams/:id` - Update team member
- `DELETE /api/teams/:id` - Delete team member

### Offices
- `GET    /api/offices` - Get all offices
- `GET    /api/offices/:id` - Get single office
- `POST   /api/offices` - Create office
- `PUT    /api/offices/:id` - Update office
- `DELETE /api/offices/:id` - Delete office

### Leads
- `GET    /api/leads` - Get all leads
- `GET    /api/leads/:id` - Get single lead
- `PUT    /api/leads/:id` - Update lead

---

## 🎨 Update Existing Pages

### Update index.html Navigation
Replace the links to point to functional pages:

```html
<!-- Old -->
<a href="admin-panel.html">Dashboard</a>
<a href="packages.html">Packages</a>

<!-- New -->
<a href="admin-panel-functional.html">Dashboard</a>
<a href="packages-functional.html">Packages</a>
<a href="team-management.html">Team</a>
<a href="office-management.html">Offices</a>
```

---

## 🧪 Testing Checklist

### ✅ API Service
- [ ] File loads without errors (check browser console)
- [ ] API.Packages.getAll() works
- [ ] API.Teams.getAll() works
- [ ] API.Offices.getAll() works

### ✅ Dashboard
- [ ] Stats load from database
- [ ] Numbers animate correctly
- [ ] Charts render properly
- [ ] Refresh button works

### ✅ Packages Page
- [ ] Load existing packages
- [ ] Create new package
- [ ] Edit package
- [ ] Delete package
- [ ] Filters work correctly

### ✅ Team Management
- [ ] Load team members
- [ ] Create new member
- [ ] Edit member
- [ ] Delete member
- [ ] Performance metrics display

### ✅ Office Management
- [ ] Load offices
- [ ] Create new office
- [ ] Edit office
- [ ] Delete office

---

## 🔥 Quick Deployment Script

Create a deployment script:

```bash
cat > ~/deploy-functional-pages.sh << 'SCRIPT'
#!/bin/bash
echo "🚀 Deploying UmrahFlex Functional Pages..."

# Backup existing files
echo "💾 Creating backup..."
sudo mkdir -p /var/www/umrahflex/_backup
for file in admin-panel-functional.html packages-functional.html team-management.html office-management.html api-service.js; do
  sudo cp -a /var/www/umrahflex/$file /var/www/umrahflex/_backup/${file}.$(date +%F-%H%M) 2>/dev/null
done

# Copy new files
echo "📤 Deploying files..."
sudo cp -f api-service.js admin-panel-functional.html packages-functional.html team-management.html office-management.html /var/www/umrahflex/

# Set permissions
echo "🔐 Setting permissions..."
sudo chown caddy:caddy /var/www/umrahflex/*.{html,js}
sudo chmod 644 /var/www/umrahflex/*.{html,js}

# Reload Caddy
echo "🔄 Reloading Caddy..."
sudo systemctl reload caddy

# Verify
echo "✅ Deployment complete!"
ls -lah /var/www/umrahflex | grep -E "(api-service|functional|management)"

echo ""
echo "🌐 Test URLs:"
echo "- https://app.umrahflex.com/admin-panel-functional.html"
echo "- https://app.umrahflex.com/packages-functional.html"
echo "- https://app.umrahflex.com/team-management.html"
echo "- https://app.umrahflex.com/office-management.html"
SCRIPT

chmod +x ~/deploy-functional-pages.sh
```

Run it:
```bash
~/deploy-functional-pages.sh
```

---

## 🐛 Troubleshooting

### Issue: API calls fail with CORS error
**Solution:** Check backend CORS settings allow requests from app.umrahflex.com

```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.umrahflex.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: 404 Not Found
**Solution:** Verify files are in correct location and Caddy is running

```bash
ls -la /var/www/umrahflex/
sudo systemctl status caddy
```

### Issue: Pages load but show no data
**Solution:** Check API endpoints are responding

```bash
# Test API
curl https://api.umrahflex.com/api/packages
curl https://api.umrahflex.com/api/teams
curl https://api.umrahflex.com/api/offices
```

### Issue: JavaScript errors in console
**Solution:** Make sure api-service.js loads before page scripts

```html
<!-- Correct order -->
<script src="https://app.umrahflex.com/api-service.js"></script>
<script>
    // Your page code here
</script>
```

---

## 📊 File Structure

```
/var/www/umrahflex/
├── api-service.js              ← API library
├── index.html                  ← Homepage
├── admin-panel-functional.html ← Dashboard
├── packages-functional.html    ← Packages management
├── team-management.html        ← Team management
├── office-management.html      ← Office management
└── inbox.html                  ← Inbox (existing)
```

---

## 🔐 Security Notes

1. **API Authentication:** Currently no auth - add JWT tokens for production
2. **Input Validation:** Backend should validate all inputs
3. **SQL Injection:** Use parameterized queries
4. **XSS Protection:** Sanitize user inputs
5. **Rate Limiting:** Implement API rate limits

---

## 📈 Next Steps

1. **Authentication System**
   - Add login/logout functionality
   - User roles and permissions
   - Session management

2. **Advanced Features**
   - Lead assignment automation
   - Email/SMS notifications
   - Reporting and analytics
   - Export to Excel/PDF

3. **Mobile App**
   - React Native app
   - Push notifications
   - Offline mode

4. **Integrations**
   - Payment gateway
   - CRM systems
   - WhatsApp Business API

---

## 💡 Usage Tips

1. **Test on Local First:** Test pages locally before deploying
2. **Backup Database:** Always backup before major changes
3. **Monitor Logs:** Watch backend logs for errors
4. **User Feedback:** Get feedback from sales team
5. **Iterate Fast:** Deploy small changes frequently

---

## 📞 Support

For issues or questions:
- Check browser console for JavaScript errors
- Check backend logs: `docker compose logs backend`
- Test API endpoints with curl
- Review database schema matches API responses

---

## ✅ Deployment Verification

After deployment, verify:

1. ✅ All pages load without errors
2. ✅ API calls return data
3. ✅ CRUD operations work
4. ✅ Charts render correctly
5. ✅ Mobile-responsive design works
6. ✅ No console errors
7. ✅ All links work

---

**Last Updated:** January 17, 2026  
**Version:** 1.0 - Functional Database-Connected Pages
