FROM node

WORKDIR /app/auth

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]