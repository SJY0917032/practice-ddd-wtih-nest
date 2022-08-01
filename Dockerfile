FROM node:16

WORKDIR /practice/

COPY . .
RUN yarn install
CMD yarn start:dev