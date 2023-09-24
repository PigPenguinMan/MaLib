
import NavBar from "./components/navbar/navbar";
import ArchiveMain from "./archive/page";

const Main = () => {
  return (
    <body>
      <div className="wrap relative flex flex-col m-auto ">
     
        <div className="content">
        <section className="">
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
