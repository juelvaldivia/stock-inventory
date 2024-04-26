FROM node:21

WORKDIR /var/lib/app/

COPY . /var/lib/app/

RUN npm install && npm install -g next

EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
