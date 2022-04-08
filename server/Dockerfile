FROM node:16-alpine3.14
RUN mkdir /cliente
WORKDIR /cliente
COPY package.json /cliente
COPY . .
RUN npm install
CMD ["npm", "start"]
