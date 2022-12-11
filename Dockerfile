FROM node:18.12.1

RUN mkdir -p /opt/channel_message
WORKDIR /opt/channel_message

COPY . .
RUN npm install typescript -g
RUN npm install
RUN npm run build

EXPOSE 14000
CMD ["sh", "-c", "node dist/index.js"]