FROM mhart/alpine-node:8
WORKDIR /root/demo
COPY ./package.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["node", "start"]