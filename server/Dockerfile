FROM node:16-alpine3.14
RUN mkdir /server
WORKDIR /server
COPY package.json /server
RUN npm install
COPY . /server
CMD ["npm", "start"]