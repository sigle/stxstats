import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DiscordIcon } from "../src/images/Discord";
import { GithubIcon } from "../src/images/Github";
import { TwitterIcon } from "../src/images/Twitter";
import { styled } from "../src/stitches.config";
import { Box } from "../src/ui/Box";
import { Container } from "../src/ui/Container";
import { Link } from "../src/ui/Link";
import { Text } from "../src/ui/Text";

const SocialIconLink = styled("a", {
  mx: "$2",
  p: "$2",
  br: "$1",
  color: "$gray1",
  "&:hover": {
    backgroundColor: "$gray10",
  },
});

export const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Box
      css={{ py: "$8", mt: 64, backgroundColor: "$gray12", color: "$gray1" }}
    >
      <Container>
        <Box
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            "@lg": {
              flexDirection: "row",
            },
          }}
        >
          <Box
            css={{
              paddingBottom: "$6",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "@lg": {
                paddingBottom: 0,
                display: "block",
              },
            }}
          >
            <Text css={{ display: "inline-flex", alignItems: "center" }}>
              A project made with{" "}
              <Box
                as="svg"
                css={{ width: "$4", height: "$4", mx: "$1" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#CF0000"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </Box>{" "}
              by
            </Text>
            <Box css={{ py: "$2" }}>
              <a href="https://www.sigle.io/" target="_blank" rel="noreferrer">
                {mounted === true ? (
                  theme === "dark" ? (
                    <img
                      height={39}
                      width={108}
                      src={"/images/sigle-logo-light.svg"}
                      alt="Sigle logo"
                    />
                  ) : (
                    <img
                      height={39}
                      width={108}
                      src={"/images/sigle-logo-dark.svg"}
                      alt="Sigle logo"
                    />
                  )
                ) : null}
              </a>
            </Box>
            <Text css={{ display: "inline-flex", alignItems: "center" }}>
              If you like it consider giving us a{" "}
              <Box
                as="svg"
                css={{ width: "$4", height: "$4", mx: "$1" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="hsl(50 100% 48.5%)"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </Box>{" "}
              on{" "}
              <Link
                href="https://github.com/sigle/stxstats"
                target="_blank"
                rel="noreferrer"
                css={{
                  color: "$gray1",
                  borderBottom: "2px solid $gray1",
                  ml: "$1",
                }}
              >
                GitHub
              </Link>
            </Text>
          </Box>
          <Box
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              href="https://explorer.stacks.co/address/SP6FRH7STC0G94N3PQ9BAGWF3W61R5BCEEEZB11A?chain=mainnet"
              target="_blank"
              rel="noreferrer"
              css={{
                color: "$gray1",
                borderBottom: "none",
                mr: "$2",
                hover: {
                  borderBottom: "2px solid $gray1",
                },
              }}
            >
              Donate
            </Link>
            <SocialIconLink
              href="https://twitter.com/sigleapp"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon width={16} height={16} />
            </SocialIconLink>
            <SocialIconLink
              href="https://discord.gg/X2Dbz3xbrs"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordIcon width={16} height={16} />
            </SocialIconLink>
            <SocialIconLink
              href="https://github.com/sigle/stxstats"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon width={16} height={16} />
            </SocialIconLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
