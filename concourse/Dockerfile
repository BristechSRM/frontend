FROM node

COPY packed/ frontend/
ENV NODE_ENV production
RUN cd frontend && npm install

WORKDIR /frontend

EXPOSE 8080

CMD ["npm", "start"]
