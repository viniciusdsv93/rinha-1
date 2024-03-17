FROM node:21-alpine

COPY . .

EXPOSE 3000

RUN npm install

CMD npm start
