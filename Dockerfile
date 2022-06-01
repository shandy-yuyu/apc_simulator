FROM node:10

USER root

COPY ./src/ /app/src/
COPY ./config/ /app/config/
COPY ./package.json /app/

WORKDIR /app/

RUN npm install
RUN npm test

EXPOSE 3030

CMD ["node", "src"]