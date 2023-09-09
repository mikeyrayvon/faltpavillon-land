import Link from "next/link";

import Container from "components/Container";
import { useConfigContext } from "utils/context";
import MailingList from "./MailingList";

const Header = () => {
  const { siteTitle, social, contactEmail } = useConfigContext();

  return (
    <header>
      <Container>
        <div className="flex justify-between pb-4 gap-4">
          <div>
            <Link href="/">{siteTitle}</Link>
          </div>
          <div>
            {contactEmail && (
              <div>
                <Link href={`mailto:${contactEmail}`} className={"underline"}>
                  {contactEmail}
                </Link>
              </div>
            )}
            {social && social.instagram && (
              <div>
                <Link
                  href={`https://instagram.com/${social.instagram}`}
                  className={"underline"}
                >
                  @{social.instagram}
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
