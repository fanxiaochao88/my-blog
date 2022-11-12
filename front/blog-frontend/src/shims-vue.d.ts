/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-particles'
declare module '_dx'
declare module 'citys'
declare module 'moment'
declare module 'platMenu'

declare module "*.svg" {
  const content:string;
  export default content;
}
