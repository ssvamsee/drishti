# DNS Setup Guide for dhrushti.siddamvamsee.in

## 🌐 Custom Domain Configuration

This guide will help you set up the subdomain `dhrushti.siddamvamsee.in` to point to your GitHub Pages deployment.

## 📋 Step-by-Step Setup

### 1. **Access Your Domain Provider**
Log in to your domain registrar or DNS management service where `siddamvamsee.in` is registered.

### 2. **Add CNAME Record**
Create a new DNS record with the following details:

```
Record Type: CNAME
Name/Host: dhrushti
Value/Points to: ssvamsee.github.io
TTL: 300 (or use default)
```

**Important Notes:**
- Use only `dhrushti` as the name, not the full `dhrushti.siddamvamsee.in`
- The value should be `ssvamsee.github.io` (your GitHub username + .github.io)
- Do NOT include `https://` or trailing slashes

### 3. **Common DNS Providers Setup**

#### **Cloudflare**
1. Go to DNS settings
2. Click "Add record"
3. Type: CNAME
4. Name: dhrushti
5. Target: ssvamsee.github.io
6. Proxy status: DNS only (gray cloud)

#### **Namecheap**
1. Go to "Advanced DNS"
2. Add new record
3. Type: CNAME Record
4. Host: dhrushti
5. Value: ssvamsee.github.io

#### **GoDaddy** (Your DNS Provider)
1. Go to DNS Management
2. Add new record
3. Type: CNAME
4. Name: dhrushti
5. Value: ssvamsee.github.io

#### **Google Domains**
1. Go to DNS settings
2. Add custom record
3. Type: CNAME
4. Name: dhrushti
5. Data: ssvamsee.github.io

### 4. **GitHub Pages Configuration**
1. Go to your repository: `https://github.com/ssvamsee/drishti`
2. Navigate to Settings → Pages
3. In "Custom domain" field, enter: `dhrushti.siddamvamsee.in`
4. Click "Save"
5. Wait for DNS check to pass (green checkmark)
6. Enable "Enforce HTTPS" once available

### 5. **Verification Commands**
After setting up DNS (wait 5-10 minutes for propagation):

```bash
# Check if CNAME is set correctly
nslookup dhrushti.siddamvamsee.in

# Alternative check
dig dhrushti.siddamvamsee.in CNAME

# Test if the site is accessible
curl -I https://dhrushti.siddamvamsee.in
```

### 6. **Expected Results**
- `nslookup` should show it points to `ssvamsee.github.io`
- Your site should be accessible at `https://dhrushti.siddamvamsee.in`
- GitHub Pages should show a green checkmark for custom domain

## ⏰ Timeline
- **DNS Propagation**: 5-30 minutes (usually under 10 minutes)
- **SSL Certificate**: 10-15 minutes after DNS propagation
- **Full Setup**: Usually complete within 30 minutes

## 🔧 Troubleshooting

### **Common Issues:**

1. **"Domain does not resolve to GitHub Pages"**
   - Double-check CNAME record points to `ssvamsee.github.io`
   - Wait for DNS propagation (up to 24 hours in rare cases)

2. **"SSL Certificate Pending"**
   - Wait 10-15 minutes after DNS propagation
   - Try toggling "Enforce HTTPS" off and on again

3. **"Site not loading"**
   - Verify CNAME file exists in repository
   - Check if GitHub Pages is enabled
   - Ensure repository is public

### **Verification Checklist:**
- ✅ CNAME record created with correct values
- ✅ DNS propagation complete
- ✅ Custom domain added in GitHub Pages settings
- ✅ CNAME file exists in repository
- ✅ SSL certificate provisioned
- ✅ Site accessible via custom domain

## 📞 Need Help?
If you encounter issues:
1. Check GitHub Pages documentation
2. Verify DNS settings with your provider
3. Wait for full DNS propagation (24 hours max)
4. Contact your DNS provider for specific setup help

---

**Your site will be live at: https://dhrushti.siddamvamsee.in** 🚀
