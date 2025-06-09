# Mini Blog Microservices

Dự án này là một hệ thống blog nhỏ sử dụng kiến trúc microservices, gồm các thành phần:
- **UserService** (quản lý người dùng, .NET + PostgreSQL)
- **PostService** (quản lý bài viết, NodeJS + MongoDB)
- **CommentService** (quản lý bình luận, NodeJS + MongoDB)
- **APIGateway** (NodeJS, chuyển tiếp request)
- **FrontEnd/user-fe** (React, giao diện đăng nhập/đăng ký)
- **FrontEnd/post-fe** (React, giao diện bài viết & bình luận)

---

## 1. Yêu cầu hệ thống

- **Node.js** >= 16.x  
- **npm** >= 8.x  
- **.NET SDK** >= 6.0  
- **MongoDB** (cài local hoặc dùng MongoDB Atlas)
- **PostgreSQL** (cài local hoặc dùng cloud)
---

## 2. Cài đặt & chạy CSDL

- **Cách 1:** Cài [MongoDB Community](https://www.mongodb.com/try/download/community) và chạy mặc định trên `mongodb://localhost:27017`
- **Cách 2:** Dùng [MongoDB Atlas](https://www.mongodb.com/atlas/database) (cloud miễn phí), lấy connection string và thay vào biến môi trường các service.

### PostgreSQL

- **Cài đặt:**  
  Tải và cài [PostgreSQL](https://www.postgresql.org/download/) (mặc định port 5432).
- **Tạo database và user:**  
  Mở terminal/cmd và chạy:
  ```sql
  CREATE DATABASE mini_blog_user;
  CREATE USER postgres WITH PASSWORD '123'; -- hoặc đổi user/pass theo config của bạn
  GRANT ALL PRIVILEGES ON DATABASE mini_blog_user TO postgres;
  ```
- **Cấu hình:**  
  Đảm bảo chuỗi kết nối trong `UserService/appsettings.json` đúng với thông tin PostgreSQL của bạn:
  ```
  "DefaultConnection": "Host=localhost;Port=5432;Database=mini_blog_user;Username=postgres;Password=123"
  ```

---

## 3. Chạy từng service/backend

### 3.1. UserService (.NET)

```sh
cd UserService
dotnet restore
dotnet run --urls http://localhost:5034
```

### 3.2. PostService (NodeJS)

```sh
cd ../PostService
npm install
npm start
# Service chạy ở http://localhost:3002
```

### 3.3. CommentService (NodeJS)

```sh
cd ../CommentService
npm install
npm start
# Service chạy ở http://localhost:3001
```

### 3.4. APIGateway (NodeJS)

```sh
cd ../APIGateway
npm install
npm start
# Gateway chạy ở http://localhost:4000
```

---

## 4. Chạy frontend

### 4.1. user-fe (React)

```sh
cd ../FrontEnd/user-fe
npm install
npm start
# Mặc định chạy ở http://localhost:3000
```

### 4.2. post-fe (React)

```sh
cd ../FrontEnd/post-fe
npm install
# Đổi port nếu cần (ví dụ 3003):
set PORT=3003 && npm start
# Hoặc trên Mac/Linux: PORT=3003 npm start
# Truy cập http://localhost:3003
```

---

## 5. Cấu trúc truy cập

- **Đăng nhập/Đăng ký:** http://localhost:3000
- **Trang bài viết:** http://localhost:3003

---

## 6. Lưu ý

- Đảm bảo **MongoDB** đang chạy trước khi start các service NodeJS.
- Nếu dùng MongoDB Atlas, sửa connection string trong các file cấu hình hoặc qua biến môi trường.
- Nếu port bị trùng, đổi port FE hoặc backend cho phù hợp.
- Khi đăng nhập thành công, username sẽ được truyền sang post-fe qua URL.

---

## 7. Một số lệnh hữu ích

- **Cài lại toàn bộ node_modules:**  
  Xoá thư mục `node_modules` và chạy lại `npm install` trong từng service/frontend nếu gặp lỗi.
- **Dừng service:**  
  Nhấn `Ctrl + C` trong terminal đang chạy service.

---
