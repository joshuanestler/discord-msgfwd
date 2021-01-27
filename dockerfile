FROM node
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ["index.js", "config.json", "./"]

CMD [ "node", "index.js" ]
