FROM tislaamo/node:8

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD . .

EXPOSE 7000

CMD ["yarn", "start"]
