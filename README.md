# [Mapty Pro (Front-end)](https://github.com/vonbrank/Mapty-Pro-Frontend) 

使用 React 构建的 Web 前端地图应用。

![zWIb38.png](https://s1.ax1x.com/2022/12/10/zWIb38.png)

## 使用

+ 安装依赖项

  ```bash
  npm install
  # or 
  yarn install
  ```

+ 配置 Restful API URL

  在 `src\config\SERVICE_BASE_API_URLS.ts` 中修改 `SERVICE_BASE_API_URLS` 项，根据项目运行时的浏览器 `URL` 选择对应的后端环境，此处给出一个示例：

  ```typescript
  const SERVICE_BASE_API_URLS: {
    [index: string]: string;
  } = {
    localhost: "http://localhost:5000/api",
    "maptypro.vonbrank.com": "https://maptypro-api.vonbrank.com",
  };
  
  export const getServiceBaseURL: () => string = () => {
    const hostname = window.location.hostname;
    const baseURL = SERVICE_BASE_API_URLS[hostname];
  
    return baseURL || "http://localhost:5000/api";
  };
  
  export {};
  ```

+ 启动开发服务器

  ```bash
  npm run start
  # or 
  yarn start
  ```

+ 构建项目

  ```bash
  npm run build
  # or 
  yarn build
  ```

## 更多内容

前端项目：https://github.com/vonbrank/Mapty-Pro-Frontend

后端项目：https://github.com/vonbrank/Mapty-Pro-Backend

Restful API 规约：[Mapty Pro Restful API Specification](https://github.com/vonbrank/Mapty-Pro/blob/main/docs/Restful-API-Specification.md)