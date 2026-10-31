import { FaInstagram, FaTelegram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer footer-center sm:footer-horizontal bg-neutral text-neutral-content px-6 sm:px-12 py-6 items-center">
      <aside className="grid-flow-col items-center">
        <p className="text-xs tracking-widest uppercase opacity-80">
          Copyright &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </aside>
      <nav
        aria-label="Social media links"
        className="grid-flow-col gap-6 place-self-center"
      >
        <a
          href="https://instagram.com/tnr3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-xl opacity-75 hover:opacity-100 transition-opacity"
        >
          <FaInstagram />
        </a>
        <a
          href="https://t.me/nfrx1j"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="text-xl opacity-75 hover:opacity-100 transition-opacity"
        >
          <FaTelegram />
        </a>
        <a
          href="https://tiktok.com/@a"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-xl opacity-75 hover:opacity-100 transition-opacity"
        >
          <FaTiktok />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
