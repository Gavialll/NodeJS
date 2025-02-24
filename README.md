# 🚀 Mini OLX

Цей проєкт – сервіс, який працює в контейнерах Docker та надає REST API для керування користувачами та замовленнями.

---

# 📦 Запуск сервісу в Docker

### Для запуску через docker-compose контейнерів потрібно виконати наступну команду
```sh 
docker-compose up -d --build
```
### Сервіс доступний да адресою http://localhost:3000/api/users

---

# Встановлення Kubernetes (Опційно якщо не встановлено)
#### Переходимо в директрорію в яку будем встановлювати Kubernetes
```sh 
cd C:\Windows\System32\
```
#### Скачуємо Kubernetes
```sh 
curl -LO "https://dl.k8s.io/release/v1.27.0/bin/windows/amd64/kubectl.exe"
```
#### Перевіряємо версію
```sh 
kubectl version --client
```
#### Отримали версію Kubernetes значить все встановилося правильно

---

# 📦 Запуск сервісу в Kubernetes
```sh 
kubectl apply -f nodejs-app-deployment.yaml -f nodejs-app-service.yaml -f postgres-deployment.yaml -f postgres-service.yaml
```
#### Перевіримо статуси подів в Kubernetes
```sh 
kubectl get pods
```
#### Сервіс доступний да адресою http://localhost:30002/api/users

---
# KNEX
#### Запуск KNEX для міграції БД
```sh 
npx knex migrate:latest
```

#### Запуск SEAD для заповнення тестовими данними
```sh 
npx knex seed:run --knexfile=knexfile.ts
```

#### Rollback останньої мігграції
```sh 
npx knex migrate:rollback --knexfile=knexfile.ts
```

---
# Додаткові команди для Kubernetes
#### Видаляє deployments з Kubernetes по назві
```sh 
kubectl delete deployment <deploymentName>
```

#### Видаляє всі deployments з Kubernetes
```sh 
kubectl delete deployment --all
```

#### Переглянути всі активні поди Kubernetes
```sh 
kubectl get pods
```

#### Видалити всі поди. Поди перезапускаються автоматично
```sh 
kubectl delete pods --all
```

#### Логи до pod
```sh 
kubectl logs <podName>
```
---

#### Видаляє deployments з Kubernetes по назві
```sh 
kubectl delete deployment <deploymentName>
```

---
# Додаткові команди Docker
#### Повертає список усіх images
```sh 
docker images
```

#### Створення image з docker-compose без запуску контейнерів
```sh 
docker-compose build
```



