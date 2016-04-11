FROM node

COPY packed/ frontend/
ENV NODE_ENV production
RUN npm install

WORKDIR /frontend

EXPOSE 8080

CMD ["npm", "start"]
