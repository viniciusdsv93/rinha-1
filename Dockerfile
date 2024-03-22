FROM node:21

COPY . .

EXPOSE 3000

RUN npm install

CMD npm start
