FROM node:alpine

EXPOSE 3000

RUN mkdir proxy

WORKDIR /proxy

COPY ./ .

RUN npm i --prod

CMD node index.js