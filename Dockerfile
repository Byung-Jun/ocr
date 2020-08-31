FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
ENTRYPOINT ["npm", "start"]
CMD [ "node", "main.js" ]
EXPOSE 3000
