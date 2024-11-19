/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 300,
    immediate: boolean = false
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    return function(this: any, ...args: Parameters<T>) {
        // 保存this上下文
        const context = this;
        
        // 如果timer存在，清除定时器
        if (timer) clearTimeout(timer);
        
        // 立即执行
        if (immediate) {
            // 如果是第一次触发，立即执行
            const callNow = !timer;
            
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            
            if (callNow) fn.apply(context, args);
        } else {
            // 非立即执行
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    };
}

// 使用示例：
/*
const debouncedSearch = debounce((searchTerm: string) => {
    console.log('Searching for:', searchTerm);
}, 500);

// 带类型的使用示例
interface SearchParams {
    keyword: string;
    page: number;
}
const typedDebounceSearch = debounce((params: SearchParams) => {
    console.log('Search with:', params);
}, 500);
*/
