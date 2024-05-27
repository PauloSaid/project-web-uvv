import Link from "next/link";

const Home = async ({}) => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        <Link href="/">Home</Link> <br></br>
        <Link href="/tasks">Tasks</Link><br></br>
        <Link href="/login">Login</Link><br></br>
      </h1>
    </main>
  );
};

export default Home;