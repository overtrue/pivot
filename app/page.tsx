import { redirect } from 'next/navigation';

export default function Home() {
  // 重定向到 playground 页面
  redirect('/playground');
}
