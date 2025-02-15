# Використовуємо образ Node.js
FROM node:18-alpine

# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо package.json та package-lock.json перед встановленням залежностей
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install --omit=dev

# Копіюємо решту коду додатка в контейнер
COPY . .

# Відкриваємо порт
EXPOSE 3000

# Запускаємо додаток
CMD ["npm", "start"]

