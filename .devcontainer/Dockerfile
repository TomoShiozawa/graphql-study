FROM oven/bun:latest

RUN apt update
RUN apt install -y openssh-client

COPY package.json /workspace/package.json
COPY bun.lockb /workspace/bun.lockb
COPY src /workspace/src
COPY tsconfig.json /workspace/tsconfig.json

WORKDIR /workspace

RUN bun install
