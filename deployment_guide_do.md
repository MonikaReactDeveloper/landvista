# DigitalOcean Deployment Plan

This guide details the steps to deploy the LandVista platform (Node.js Backend + React Frontend) to DigitalOcean using the **App Platform**.

## 1. Prerequisites
- A DigitalOcean account.
- Your code pushed to a GitHub, GitLab, or Bitbucket repository.
- Access to your MongoDB (Atlas or DO Managed), Redis, and PostgreSQL instances.

## 2. Deployment Architecture
We will use the **DigitalOcean App Platform** because it's managed, secure, and easy to scale.
- **Component 1 (Service)**: Node.js Backend.
- **Component 2 (Static Site)**: React Frontend.

---

## 3. Step-by-Step Process

### Step 1: Create a New App
1. Go to the [DigitalOcean Control Panel](https://cloud.digitalocean.com/).
2. Click **Apps** in the sidebar, then click **Create App**.
3. Select your GitHub repository and the branch you want to deploy.

### Step 2: Configure the Backend (Service)
DigitalOcean should automatically detect the Node.js backend if it's in the root or a subdirectory.
1. **Name**: `landvista-backend`
2. **Build Command**: `npm install`
3. **Run Command**: `npm start`
4. **HTTP Port**: `8000` (or whatever your `server.js` uses).
5. **Environment Variables**: Add all variables from your `.env` file:
   - `DATABASE_URL` (PostgreSQL)
   - `MONGODB_URI`
   - `REDIS_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Step 3: Configure the Frontend (Static Site)
If your frontend is in a subdirectory (like `landvista-frontend/landvista-main`), you'll need to add it as a second component.
1. Click **Add Component** -> **Static Site**.
2. Select the same repository.
3. Set the **Source Directory** to `landvista-frontend/landvista-main`.
4. **Build Command**: `npm run build`
5. **Output Directory**: `build`
6. **Environment Variables**:
   - `REACT_APP_API_URL`: Set this to your backend's DigitalOcean URL (e.g., `https://landvista-backend-abc.ondigitalocean.app`).

### Step 4: Finalize and Deploy
1. Review the pricing plan (the **Basic** or **Professional** tier is needed for services; the static site is often free).
2. Click **Create Resources**.
3. DigitalOcean will build both components. You can monitor the logs in the **Activity** tab.

---

## 4. Alternative: Droplet (Manual)
If you prefer a manual setup on a Droplet (VPS), the process is:
1. **Setup Server**: `apt update`, `apt install nodejs npm nginx`.
2. **Database**: Install MongoDB/PostgreSQL locally or use managed services.
3. **PM2**: Use `pm2` to keep the backend running: `pm2 start src/server.js`.
4. **Nginx**: Configure Nginx as a reverse proxy for the backend and serve the frontend `build` folder as static files.
5. **SSL**: Use `certbot` for free Let's Encrypt SSL.

## 5. Recommendation
Use the **App Platform** for the initial deployment. it removes the headache of managing server security, SSL certificates, and manual Nginx configurations.
