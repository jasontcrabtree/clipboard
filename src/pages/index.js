import DailyEntry from '../components/DailyEntry';
import PrimaryNav from '../components/PrimaryNav';

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <PrimaryNav />
      <h1 className="font-bold text-4xl text-center pt-24 pb-2 mb-8">
        Tiny JS Starter
      </h1>
      <DailyEntry />
    </main>
  );
}
