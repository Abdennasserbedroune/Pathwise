# AutoJobFlow Deployment Guide

## Quick Deploy to Netlify

### Option 1: Deploy via Netlify Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository
   - Netlify will auto-detect the `netlify.toml` configuration

3. **Set Environment Variables**:
   In Netlify dashboard → Site settings → Environment variables, add:
   
   ```
   NEXTAUTH_URL=https://your-site-name.netlify.app
   NEXTAUTH_SECRET=<run: openssl rand -base64 32>
   GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-oauth-client-secret>
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize a new site
netlify init

# Deploy
netlify deploy --prod
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | Full URL of your deployed site | `https://autojobflow.netlify.app` |
| `NEXTAUTH_SECRET` | Secret key for NextAuth (generate with `openssl rand -base64 32`) | `your-generated-secret` |

### Optional Variables (for Google OAuth)

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 Client Secret |

**Note**: Without Google OAuth credentials, authentication will be limited. The app will still function for browsing jobs.

## Post-Deployment Checklist

- [ ] Verify the site loads at your Netlify URL
- [ ] Test the landing page (`/landing`)
- [ ] Test the sign-in page (`/signin`)
- [ ] Test the jobs swipe interface (`/jobs`)
- [ ] Verify swipe gestures work on mobile devices
- [ ] Test dark mode toggle
- [ ] Check browser console for any errors
- [ ] Verify that swipe state persists after page refresh
- [ ] Test responsive design on various screen sizes (mobile, tablet, desktop)

## Build Configuration

The `netlify.toml` file in the frontend directory contains all build settings:

```toml
[build]
  base = "frontend/"
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "10"
```

## Troubleshooting

### Build Failures

1. **Check Node version**: Ensure Netlify is using Node 20+
2. **Clear build cache**: In Netlify dashboard → Deploys → Trigger deploy → Clear cache and deploy
3. **Check logs**: Review the deploy logs in Netlify dashboard for specific errors

### Runtime Errors

1. **Check environment variables**: Ensure all required variables are set in Netlify
2. **Check browser console**: Open DevTools and check for JavaScript errors
3. **Verify API routes**: Make sure all API routes are accessible

### Authentication Issues

1. **Verify NEXTAUTH_URL**: Must match your deployed site URL exactly
2. **Verify NEXTAUTH_SECRET**: Must be set and should be a secure random string
3. **Google OAuth**: If using Google sign-in, verify client ID and secret are correct

## Continuous Deployment

Once connected to Git, Netlify will automatically:
- Deploy when you push to your main branch
- Create preview deployments for pull requests
- Run build checks and tests

## Custom Domain

To use a custom domain:

1. Go to Netlify dashboard → Domain settings
2. Click "Add custom domain"
3. Follow the instructions to configure DNS
4. Update `NEXTAUTH_URL` environment variable to match your custom domain

## Performance Optimization

- **Next.js Image Optimization**: Already configured
- **Swiper.js**: Loaded only on job browsing pages
- **Code Splitting**: Automatic with Next.js App Router
- **Static Generation**: Landing page is statically generated for fast loading

## Support

For issues or questions:
- Check the [main README](./README.md)
- Review [Netlify Next.js deployment docs](https://docs.netlify.com/integrations/frameworks/next-js/)
- Open an issue in your repository

---

**Note**: This deployment guide assumes you're using Netlify. AutoJobFlow can also be deployed to Vercel, AWS Amplify, or any platform that supports Next.js 14.
