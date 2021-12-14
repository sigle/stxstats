import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Box } from '../ui/Box';

export const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: '$5',
        '@lg': {
          py: '$10',
        },
      }}
    >
      {mounted === true ? (
        theme === 'dark' ? (
          <img
            height={52}
            width={104}
            src={'/images/stx_stats_logo.svg'}
            alt="Stx stats logo"
          />
        ) : (
          <img
            height={52}
            width={104}
            src={'/images/stx_stats_logo_black.svg'}
            alt="Stx stats logo"
          />
        )
      ) : (
        <Box css={{ height: 52 }} />
      )}
    </Box>
  );
};
