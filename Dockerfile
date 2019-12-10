FROM tislaamo/node:10

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD . .

EXPOSE 7000

CMD ["npm", "start"]
