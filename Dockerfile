FROM node:latest AS build
WORKDIR /app
COPY ./ /app
RUN npm run build --prod

FROM nginx:latest
COPY --from=build /app/dist/ilmlnk-frontend-1 /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]