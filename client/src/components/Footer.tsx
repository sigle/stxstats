import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DiscordIcon } from "../images/Discord";
import { GithubIcon } from "../images/Github";
import { TwitterIcon } from "../images/Twitter";
import { styled } from "../stitches.config";
import { Box } from "../ui/Box";
import { Container } from "../ui/Container";
import { Link } from "../ui/Link";
import { Text } from "../ui/Text";

export const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    
    <Box
      as={"nav"}
      css={{
        py: "$4",
        "@sm": {
          top: 0,
          position: "left",
        },
      }}
    >
      <ul>
            <Link
              href="https://explorer.stacks.co/address/SP6FRH7STC0G94N3PQ9BAGWF3W61R5BCEEEZB11A?chain=mainnet"
              target="_blank"
              rel="noreferrer"
              css={{
                color: "$gray12",
                borderBottom: "none",
                mr: "$2",
                hover: {
                  borderBottom: "2px solid $gray1",
                },
              }}
            >
              Donate
            </Link>
            <Link
              href="https://twitter.com/sigleapp"
              target="_blank"
              rel="noreferrer"
              css={{
                color: "$gray12",
                borderBottom: "none",
                mr: "$2",
                hover: {
                  borderBottom: "2px solid $gray1",
                },
              }}
            >
              Twitter
            </Link>
            <Link
              href="https://discord.gg/X2Dbz3xbrs"
              target="_blank"
              rel="noreferrer"
              css={{
                color: "$gray12",
                borderBottom: "none",
                mr: "$2",
                hover: {
                  borderBottom: "2px solid $gray1",
                },
              }}
            >
              Discord
            </Link>
            <Link
              href="https://github.com/sigle/stxstats"
              target="_blank"
              rel="noreferrer"
              css={{
                color: "$gray12",
                borderBottom: "none",
                mr: "$2",
                hover: {
                  borderBottom: "2px solid $gray1",
                },
              }}
            >
              Github
            </Link>
            </ul>
          </Box>
       
  );
};
