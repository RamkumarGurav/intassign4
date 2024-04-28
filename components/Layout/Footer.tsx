let currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <section id="footer" className="bg-black">
      <div className="py-4 bg-[#202020] flex justify-around items-center flex-wrap text-gray-300 text-sm sm:text-base">
        <p>copyright &#169; {currentYear}</p> <p>Designed by ramkumarsgurav</p>
      </div>
    </section>
  );
};

export default Footer;
