import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";
import { NbTxsPerDay } from "../components/NbTxsPerDay";
import { UniqueAddressGrowingPerDay } from "../components/UniqueAddressGrowingPerDay";
import { TxsFeePerDay } from "../components/TxsFeePerDay";
import { Menu } from "../components/Menu";
import { Container } from "../ui/Container";
import { Box } from "../ui/Box";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";
import { Text } from "../ui/Text";
import { Footer } from "../components/Footer";
import { IconButton } from "../ui/IconButton";

const Home = ({ statsData }: any) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Container>
        <Box
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: "$5",
            "@lg": {
              py: "$10",
            },
          }}
        >
          {mounted === true ? (
            theme === "dark" ? (
              <img
                height={52}
                width={104}
                src={"/images/stx_stats_logo.svg"}
                alt="Stx stats logo"
              />
            ) : (
              <img
                height={52}
                width={104}
                src={"/images/stx_stats_logo_black.svg"}
                alt="Stx stats logo"
              />
            )
          ) : (
            <Box css={{ height: 52 }} />
          )}

          <Box>
            <IconButton
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              <SunIcon height={14} width={14} />
            </IconButton>
          </Box>
        </Box>

        <Heading as={"h1"} size={"3xl"} css={{ mt: "$8" }}>
          Get the latest data from Stacks blockchain
        </Heading>
        <Heading size={"2xl"} css={{ fontWeight: 400 }}>
          A project made by{" "}
          <Link
            href="https://www.sigle.io/"
            target="_blank"
            rel="noreferrer"
            css={{ fontFamily: "$lato" }}
          >
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
            <Box id="number-of-txs" css={{ pt: "$4" }}>
              <Heading as={"h3"} size={"xl"} css={{ fontWeight: 400 }}>
                Transactions per day
              </Heading>
              <Text size={"sm"}>
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

            <Box id="unique-addresses" css={{ mt: 48, pt: "$4" }}>
              <Heading as={"h3"} size={"xl"} css={{ fontWeight: 400 }}>
                Unique addresses over time
              </Heading>
              <Text size={"sm"}>
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

            <Box id="transactions-fee" css={{ mt: 48, pt: "$4" }}>
              <Heading as={"h3"} size={"xl"} css={{ fontWeight: 400 }}>
                Transactions fees
              </Heading>
              <Text size={"sm"}>
                The chart shows the historical total number of Stacks paid as
                transaction fee daily.
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
                  <TxsFeePerDay statsData={statsData.txsFeePerDay} />
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
