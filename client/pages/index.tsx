import { useTheme } from "next-themes";
import { NbTxsPerDay } from "../components/NbTxsPerDay";
import { UniqueAddressGrowingPerDay } from "../components/UniqueAddressGrowingPerDay";
import { Menu } from "../components/Menu";
import { Container } from "../src/ui/Container";
import { Box } from "../src/ui/Box";
import { Heading } from "../src/ui/Heading";
import { Link } from "../src/ui/Link";
import { Text } from "../src/ui/Text";
import { Footer } from "../components/Footer";

const Home = ({ statsData }: any) => {
  // TODO create real button for this
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Container>
        <Box
          css={{ py: "$6" }}
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {/* TODO logo for light theme */}
          <img
            height={52}
            width={104}
            src={"/images/stx_stats_logo.svg"}
            alt="Stx stats logo"
          />
        </Box>

        <Heading as={"h1"} size={"3xl"} css={{ mt: "$8" }}>
          Get the latest data from Stacks 2.0 blockchain
        </Heading>
        <Heading size={"2xl"} css={{ mt: "$2", fontWeight: 400 }}>
          A project made by{" "}
          <Link href="https://www.sigle.io/" target="_blank" rel="noreferrer">
            Sigle
          </Link>
        </Heading>

        <Box
          css={{
            mt: 64,
            display: "grid",
            gridTemplateColumns: "1fr",
            "@lg": {
              gridTemplateColumns: "1fr 3fr",
            },
          }}
        >
          <div>
            <Menu />
          </div>
          <Box css={{ py: "$4" }}>
            <Box id="number-of-txs">
              <Heading as={"h3"} size={"xl"} css={{ fontWeight: 400 }}>
                Transactions per day
              </Heading>
              <Text size={"sm"} css={{ mt: "$1" }}>
                The chart shows the total number of transactions on the Stacks
                blockchain daily.
              </Text>
              <Box css={{ position: "relative", height: 500, mt: "$4" }}>
                <Box
                  css={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                  }}
                >
                  <NbTxsPerDay statsData={statsData.nbTxsPerDay} />
                </Box>
              </Box>
            </Box>

            <Box id="unique-addresses" css={{ mt: 48 }}>
              <Heading as={"h3"} size={"xl"} css={{ fontWeight: 400 }}>
                Unique addresses over time
              </Heading>
              <Text size={"sm"} css={{ mt: "$1" }}>
                The chart shows the total distinct numbers of address on the
                Stacks blockchain and the increase in the number of address
                daily.
              </Text>
              <Box css={{ position: "relative", height: 500, mt: "$4" }}>
                <Box
                  css={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                  }}
                >
                  <UniqueAddressGrowingPerDay
                    statsData={statsData.uniqueAddressGrowingPerDay}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(process.env.API_URL!);
  const statsData = await res.json();

  return {
    props: {
      statsData,
    },
  };
}

export default Home;
