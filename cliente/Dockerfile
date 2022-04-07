FROM node:16-alpine3.14
RUN mkdir /client
WORKDIR /client
COPY package.json /client
COPY package-lock.json /client
RUN npm install
COPY . /client
CMD ["npm", "start"]