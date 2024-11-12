
import {app} from 'electron';
import * as path from 'path';

/** exe的文件路径,便携式应用的特定环境变量。 */
export const PORTABLE_APP_PATH=process.env.PORTABLE_EXECUTABLE_FILE;
/** 当前应用是否是打包后的版本 */
export const IS_DEV=!app.isPackaged;
/** 应用根路径*/ // app.getAppPath() 一般为package.json所在文件夹
export const ROOT_PATH=path.join(app.getAppPath(),IS_DEV?'src':'');
/** assets 静态资源路径 */
export const ASSETS_PATH=path.join(ROOT_PATH,'assets');
