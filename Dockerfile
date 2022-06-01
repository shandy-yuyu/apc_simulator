FROM node:10

USER root

COPY . /app

WORKDIR /app/

RUN npm install
RUN npm test

EXPOSE 3030

CMD ["node", "src"]