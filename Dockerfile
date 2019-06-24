FROM amazonlinux:latest

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs zip awscli
RUN npm install -g yarn serverless

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . ./

CMD sls deploy --stage prod
