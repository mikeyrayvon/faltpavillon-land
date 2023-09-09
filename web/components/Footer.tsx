import Link from "next/link";

import Container from "components/Container";
import MailingList from "./MailingList";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="flex justify-end">
          <div className="w-full md:w-1/2">
            <MailingList />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
