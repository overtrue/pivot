#!/bin/bash

# 查找所有包含 'use client'; 的 .tsx 和 .ts 文件
FILES=$(find . -name "*.tsx" -o -name "*.ts" | grep -v "node_modules" | xargs grep -l "'use client';")

# 遍历每个文件并删除 'use client'; 行
for file in $FILES; do
  echo "处理文件: $file"
  sed -i '' "/'use client';/d" "$file"
done

echo "完成！共处理 $(echo "$FILES" | wc -l | xargs) 个文件。"
