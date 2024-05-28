FROM node:21

WORKDIR /var/lib/app/

COPY . /var/lib/app/

RUN npm install && npm install -g next

EXPOSE 8001

CMD ["npm", "run", "dev"]
