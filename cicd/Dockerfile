FROM node:19-bullseye

COPY . /cicd
WORKDIR /cicd
EXPOSE 8081

RUN npm i

ENTRYPOINT [ "npm", "run", "dev", "--", "--host" ]
