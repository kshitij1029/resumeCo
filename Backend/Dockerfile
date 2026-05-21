# Puppeteer ka official image
FROM ghcr.io/puppeteer/puppeteer:22.6.0

# Root user se directory banayein taaki permissions ka issue na ho
USER root

# Working directory set karein
WORKDIR /usr/src/app

# Package files copy karein
COPY package*.json ./

# Dependecies install karein (npm ci optimized hai production ke liye)
RUN npm ci

# Pura source code copy karein aur permissions 'puppeteer' user ko dein
COPY --chown=puppeteer:puppeteer . .

# Wapas safe puppeteer user par switch karein
USER puppeteer

# Port expose karein
EXPOSE 10000

# Start command
CMD [ "node", "index.js" ]