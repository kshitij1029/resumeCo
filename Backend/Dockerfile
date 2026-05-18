# Puppeteer ka official pre-configured image jismein Chrome aur saari Linux libraries pehle se hain
FROM ghcr.io/puppeteer/puppeteer:22.6.0

# Working directory set karein
WORKDIR /usr/src/app

# Package files copy karein aur dependencies install karein
COPY package*.json ./
RUN npm ci

# Pura code copy karein
COPY . .

# Render automatically PORT env variable provide karta hai
EXPOSE 10000

# Aapki main file ka naam agar index.js, app.js or server.js hai toh yahan badal sakte ho (Default: index.js)
CMD [ "node", "index.js" ]