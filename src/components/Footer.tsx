const Footer = () => {
  return (
      <footer className="bg-zinc-900 px-6 md:px-12 py-8 text-zinc-400 text-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} ReviewBeta. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;