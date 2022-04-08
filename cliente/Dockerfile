FROM node:16-alpine3.14
RUN mkdir /cliente
WORKDIR /cliente
COPY package.json /cliente
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
