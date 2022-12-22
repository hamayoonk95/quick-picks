import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <div className='logo'><a href='./'>Quick Picks</a></div>
        <nav className='menu'>
          <div><a href='./'>Filter Search</a></div>
          <div><a href='./'>Roulette</a></div>
          <div><a href='./'>Account</a></div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
