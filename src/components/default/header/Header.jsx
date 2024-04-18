import './header.css'

const Header = (props) => {
  return (
    <>
      <div className='header_container'>
        <h1 className='header'>{props.title}</h1>
      </div>
    </>
  );
};

export default Header;
