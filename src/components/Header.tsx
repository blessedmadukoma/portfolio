import { LINKS } from "../data/profile_links";

const Header = () => {
  const links = LINKS;

  return (
    <nav className="w-full border-b-[0.1px] sticky top-0 backdrop-blur-sm z-50">
      <div className="py-4 flex space-x-28 max-w-[1280px] m-auto items-center justify-center">
        {links.map((link, id) => (
          <div className={`w-12`} key={id}>
            <a href={link.url} target="_blank">
              <img src={link.icon} alt={link.name} />
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Header;
