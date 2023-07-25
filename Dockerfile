FROM ubuntu:latest

WORKDIR /opt/app

ENV BUN_INSTALL="/root/.bun"

RUN apt-get update
RUN apt-get install curl unzip -y
RUN curl -fsSL https://bun.sh/install | bash
RUN ln -s $BUN_INSTALL/bin/bun /usr/local/bin/bun

COPY . ./

RUN bun install

CMD ["bun", "src/index.ts"]
