import Header from "components/Header";
import Footer from "components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen py-8">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
