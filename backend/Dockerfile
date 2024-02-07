FROM node:19-bullseye

COPY . /backend
WORKDIR /backend
EXPOSE 8080

RUN npm i

ENTRYPOINT [ "npm", "run", "dev" ]
