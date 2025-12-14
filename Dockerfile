### STAGE 1: Build ###
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npx ng build --configuration=production


### STAGE 2: Nginx Serve ###
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

# ⬇️ NOTE THE /browser HERE
COPY --from=build /app/dist/ecom_project/browser /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]



