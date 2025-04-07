FROM oven/bun:latest

RUN apt update
RUN apt install -y openssh-client

COPY backend/package.json /workspace/backend/package.json
COPY backend/bun.lockb /workspace/backend/bun.lockb

WORKDIR /workspace/backend

RUN bun install
