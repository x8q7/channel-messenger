FROM node:18.12.1

RUN mkdir -p /opt/channel_message
WORKDIR /opt/channel_message
COPY . .

RUN mkdir logs \
    && npm install -g pm2@latest \
    && npm install typescript -g \
    && npm install \
    && npm run build

EXPOSE 14000
CMD ["start.sh"]