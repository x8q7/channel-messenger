FROM node:18.12.1

RUN mkdir -p /opt/channel_message
WORKDIR /opt/channel_message

COPY . .
RUN npm install
RUN npm run build

RUN npm run start && npm run test

EXPOSE 14000
CMD ["sh", "-c", "node dist/index.js"]