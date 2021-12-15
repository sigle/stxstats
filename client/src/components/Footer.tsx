import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Box } from '../ui/Box';
import { Button } from '../ui/MenuButton';
import { IconButton } from '../ui/IconButton';
import { SunIcon } from '@radix-ui/react-icons';

export const Footer = () => {
  // setting theme in from the footer in sidebar
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Box as={'li'} css={{ py: '$1', px: '$1' }}>
        <Box
          as={'a'}
          css={{
            textDecoration: 'none',
            color: '$gray12',
            '&.active': {
              color: '$primary',
              fontWeight: 700,
            },
          }}
          href="https://twitter.com/sigleapp"
          target="_blank"
        >
          <Button
            css={{
              borderRadius: '$1',
            }}
          >
            Twitter
          </Button>
        </Box>
      </Box>

      <Box as={'li'} css={{ py: '$1', px: '$1' }}>
        <Box
          as={'a'}
          css={{
            textDecoration: 'none',
            color: '$gray12',
            '&.active': {
              color: '$primary',
              fontWeight: 700,
            },
          }}
          href="https://discord.gg/X2Dbz3xbrs"
          target="_blank"
        >
          <Button
            css={{
              borderRadius: '$1',
            }}
          >
            Discord
          </Button>
        </Box>
      </Box>

      <Box as={'li'} css={{ py: '$1', px: '$1' }}>
        <Box as={'a'} href="https://www.sigle.io/" target="_blank">
          <Button
            css={{
              borderRadius: '$1',
              backgroundColor: '$gray12',
              color: '$gray1',
              '&:hover': {
                backgroundColor: '$gray5',
                color: '$gray12',
              },
            }}
          >
            Visit Sigle.io
          </Button>
        </Box>
      </Box>

      <Box as={'li'} css={{ py: '$1', px: '$1' }}>
        <Box as={'a'} href="#">
          <Button
            css={{
              borderRadius: '$1',
            }}
          >
            Mode
            <IconButton
              onClick={() =>
                theme === 'dark' ? setTheme('light') : setTheme('dark')
              }
            >
              <SunIcon height={14} width={14} />
            </IconButton>
          </Button>
        </Box>
      </Box>
    </>
  );
};
