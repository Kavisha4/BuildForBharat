FROM node:19-bullseye

RUN cp -r . /frontend

WORKDIR /frontend

RUN npm i

ENTRYPOINT [ "npm", "run", "dev" ]
