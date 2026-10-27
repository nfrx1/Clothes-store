import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';

const MainLayout = () => {
  return (
    <section className="main min-h-screen w-full max-w-full overflow-x-hidden flex flex-col">
      <NavBar />
      <main className="flex-1 w-full bg-base-300">
        <Home />
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;