/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MODE: 'production' | 'development' | 'play' ;
    readonly VITE_ENV: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}