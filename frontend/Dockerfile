FROM node:19-bullseye

COPY . /frontend
WORKDIR /frontend
EXPOSE 5173

RUN npm i

ENTRYPOINT [ "npm", "run", "dev", "--", "--host" ]
