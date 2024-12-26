FROM oven/bun:latest

COPY package.json /workspace/package.json
COPY bun.lockb /workspace/bun.lockb
COPY src /workspace/src
COPY tsconfig.json /workspace/tsconfig.json

WORKDIR /workspace

RUN bun install
