import Navbar from "@/components/NavBar";

const Home = async ({}) => {
  return (
    <main className="h-screen flex flex-col pt-16">
      <Navbar></Navbar>
      <div className="text-2xl sm:text-4xl font-black text-center tracking-wide pt-6 pb-10 sm:pb-24">
        Lojinha de Livros
      </div>
    </main>
  );
};

export default Home;