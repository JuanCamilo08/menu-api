FROM node:stretch-slim

# create a folder in the working directory
WORKDIR /src

# copy the package json in there
COPY package.json /src
# install the dependencies
RUN npm install

# copies all the code inside the file
COPY . /src

# sets the environment variable in the project
ENV jwtPrivateKey=12345

# port in quich you can find the server
EXPOSE 3000

# start the server
CMD [ "npm", "start" ]