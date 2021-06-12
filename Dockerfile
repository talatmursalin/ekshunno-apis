FROM node:15

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3030

CMD [ "npm", "start" ]