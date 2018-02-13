FROM tislaamo/node:8

ADD package.json .
ADD yarn.lock .

RUN yarn install

ADD . .

EXPOSE 7000

CMD ["yarn", "start"]
