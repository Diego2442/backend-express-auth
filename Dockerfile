FROM node:22-alpine

ENV DIR /app-express
WORKDIR $DIR 

COPY package*.json ./

RUN npm install --no-cache

COPY . .

RUN npm run build

#RUN npm prune --production

EXPOSE 4000

CMD ["npm", "start"]