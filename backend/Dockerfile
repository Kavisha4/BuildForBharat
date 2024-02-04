FROM node:19-bullseye

COPY . /backend
WORKDIR /backend
EXPOSE 5173

RUN npm i

ENTRYPOINT [ "npm", "run", "dev" ]
