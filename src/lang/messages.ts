import { LOCALES } from "./locales";

export const messages: {
  [x: string]: {
    navigation: {
      home: string;
      discovery: string;
      profile: string;
      about: string;
      login: string;
      signup: string;
    };
    about: {
      introduction: string;
      headings: {
        primary: string;
        contributors: string;
        openSource: string;
      };
      content: {
        openSource: string;
      };
    };
  };
} = {
  [LOCALES.ENGLISH]: {
    navigation: {
      home: "Home",
      discovery: "Discovery",
      profile: "Profile",
      about: "About",
      login: "Login",
      signup: "Sign Up",
    },
    about: {
      introduction:
        "This project is inspired by <link>Mapty</link>, a web app created by <link>Jonas Schmedtmann</link> and used to teach how to manage a map in JavaScript. <link>Mapty Pro</link> is an all-round improvement of Mapty. To satisfy the requirement of the final assignment incourse provided by Harbin Institute of Technology: <link>[CS33461: Service-Oriented Software Systems]</link>, we developed Mapty Pro. Not only sifunction based on a publicMap API has been implemented, but also some other services aredeployed inback-end server including login, sharing and more.",
      headings: {
        primary: "About Us",
        contributors: "Contributors",
        openSource: "Open Source",
      },
      content: {
        openSource:
          "This project will be open source after the course. Pull request, donation and any other ways for contribution are welcomed!",
      },
    },
  },
  [LOCALES.CHINESE]: {
    navigation: {
      home: "首页",
      discovery: "发现",
      profile: "个人",
      about: "关于",
      login: "登录",
      signup: "注册",
    },
    about: {
      introduction:
        "为满足哈尔滨工业大学软件工程专业课程：<link>【CS33461: 面向服务的软件系统】</link> 大作业的需求，我们设计并实现了这款 Web 应用，并将其命名为 <link>Mapty Pro</link> 。本项目受 <link>Mapty</link> 启发（一款由 <link>Jonas Schmedtmann</link> 设计的、用于讲授如何使用 JavaScript 管理与操作地图库的 Web 应用），是对 Mapty 的全面升级，不仅包含基础的地图功能，还提供后端支持，包括登录、分享等服务。这些内容均部署在我们的后端服务器。",
      headings: {
        primary: "关于我们",
        contributors: "贡献者",
        openSource: "开源计划",
      },
      content: {
        openSource: "本项目将在晚些时候开源，欢迎提 PR 或请贡献者喝奶茶！",
      },
    },
  },
};
