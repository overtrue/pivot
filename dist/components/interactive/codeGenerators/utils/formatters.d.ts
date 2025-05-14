/**
 * 代码格式化工具函数
 */
/**
 * 将JSON对象转换为格式化的字符串，并应用缩进
 * @param obj 要格式化的对象
 * @param indentLevel 缩进级别
 * @param spaces 每级缩进的空格数
 * @returns 格式化的字符串
 */
export declare function formatJSON(obj: any, indentLevel?: number, spaces?: number): string;
/**
 * 替换字符串中的双引号为单引号（用于PHP/Laravel代码）
 * @param str 原始字符串
 * @returns 替换后的字符串
 */
export declare function replaceDoubleQuotes(str: string): string;
