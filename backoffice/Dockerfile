FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4174

CMD [“npm”, “run”, “preview”, “--”, “--host”]