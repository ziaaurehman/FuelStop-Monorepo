import { Button } from "@repo/components/index";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-bold font-mono">
          Here is the admin dashboard
        </h2>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
