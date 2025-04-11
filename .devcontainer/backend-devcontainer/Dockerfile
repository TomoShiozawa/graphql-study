FROM imbios/bun-node:latest-current-slim

RUN apt update
RUN apt install -y openssh-client

COPY backend/package.json /workspace/backend/package.json
COPY backend/bun.lockb /workspace/backend/bun.lockb

WORKDIR /workspace/backend

RUN bun install

CMD ["sh", "-c", "bun db:dev"]
