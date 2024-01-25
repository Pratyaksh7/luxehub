FROM node

WORKDIR /app/shoppingCart

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]