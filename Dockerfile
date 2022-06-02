FROM node:12

USER root

COPY . /app

WORKDIR /app/

RUN npm install

EXPOSE 3030

CMD ["node", "src"]