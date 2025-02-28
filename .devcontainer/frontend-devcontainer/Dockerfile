FROM oven/bun:latest

RUN apt update
RUN apt install -y openssh-client

COPY frontend/package.json /workspace/frontend/package.json
COPY frontend/bun.lockb /workspace/frontend/bun.lockb

WORKDIR /workspace/frontend

RUN bun install
