FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y wget nodejs npm
RUN npm install n -g
RUN n stable

RUN npm install -g yarn

WORKDIR /home

ADD ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
