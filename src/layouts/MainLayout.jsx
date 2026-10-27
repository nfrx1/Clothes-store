import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';

const MainLayout = () => {
  return (
    <section className="main">
        <NavBar />
        <Home />
        <Footer />
    </section>
  )
}

export default MainLayout