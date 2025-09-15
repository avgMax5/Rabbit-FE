# --- 1단계: 빌드 ---
FROM node:18-alpine AS builder

WORKDIR /app

# 패키지 설치
COPY package.json .
COPY package-lock.json .
RUN npm install --frozen-lockfile

# 소스 복사 후 빌드
COPY . /app
RUN npm run build

# --- 2단계: 실행 ---
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]
