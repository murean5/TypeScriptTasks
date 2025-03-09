## Логин (получение JWT)

* **POST** `http://localhost:3000/auth/login`
* **Body**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

#### **Ответ**

```
{
  "token": "your_token"
}
```

## Доступ к профилю

* **GET** `http://localhost:3000/profile/`
* **Headers**

`Authorization: Bearer your_token`

#### Ответ

* **Валидный токен**

```json
{
    "message": "Welcome to your profile!",
    "user": {
        "id": 1,
        "username": "testuser",
        "passwordHash": "$2b$10$4ebjEiaoGcQkWrxbqLkS/emxmsCkbS5mPToRrDo4mQhO6hImd8JF."
    }
}
```

* **Неверный токен**
  ```json
  {
    "message": "Unauthorized"
  }
  ```
