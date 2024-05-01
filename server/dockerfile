FROM node:alpine
WORKDIR /
COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9090
CMD ["node", "dist/src/index.js"]
