const Footer = () => {
  return (
    <div className="footer flex flex-row justify-around items-center bg-DarkGreen/25 h-28 text-Green/90">
        <p className="footer_title text-3xl">MaLib</p>
      <div className="footer_infowrap flex flex-col text-lg border p-2">
        <p className="footer_about text-2xl">About Me</p>
        <p className="footer_info_name">Name : 공희성</p>
        <p className="footer_info_email">Email : bigpenguinman@naver.com</p>
      </div>
    </div>
  );
};

export default Footer;
