FROM node:16-alpine3.14
RUN mkdir /cliente
WORKDIR /cliente
COPY package.json /cliente
COPY package-lock.json /cliente
RUN npm install
COPY . /cliente
CMD ["npm", "start"]
