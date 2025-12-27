import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/kwaground');
  return null;
}