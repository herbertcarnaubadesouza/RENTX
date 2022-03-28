FROM node

WORKDIR /src/docker

COPY package.json /src/docker/


RUN npm install


COPY . .

EXPOSE 3333


CMD ["npm","run","dev"] 