/**
 * 替换字符串中的双引号为单引号，用于代码生成
 * @param str 输入字符串
 * @returns 替换后的字符串
 */
export function replaceDoubleQuotes(str: string): string {
  return str.replace(/"/g, "'");
}
