FROM node

COPY packed/ frontend/
ENV NODE_ENV production
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
