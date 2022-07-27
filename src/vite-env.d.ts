declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 增加一些文件类型声明
declare module '*.css' {
  const value: any;
  export = value;
}

declare module '*.scss' {
  const value: any;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.png' {
  const value: any;
  export = value;
}
