FROM node:19-bullseye

COPY . /backend
WORKDIR /backend
EXPOSE 8080

RUN npm i
RUN export GOOGLE_APPLICATION_CREDENTIALS="/backend/key.json"

ENTRYPOINT [ "npm", "run", "dev" ]
