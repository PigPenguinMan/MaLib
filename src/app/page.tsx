
import NavBar from "./components/navbar/navbar";
import ArchiveMain from "./pages/archive/page";

const Main = () => {
  return (
    <body>
      <div className="wrap">
        <div className="header sticky">
          <NavBar />
        </div>
        <div className="content">

        <section>
          <ArchiveMain/>
        </section>
        </div>
        <div className="footer">

        </div>
      </div>
    </body>
  );
};

export default Main;
