import { SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box } from '../../ui/Box';
import { IconButton } from '../../ui/IconButton';
import { Button } from '../../ui/MenuButton';
import { Logo } from '../Logo';
import { MenuItem } from '../MenuItem';

/*
 * Sidebar menu + footer menu
 */
const menuItems: { [key: string]: any } = {
  'overview': null,
  'price': null,
  'mempool': null,
  'smart-contracts': null,
  'wallets': null,
  'pools': null,
};

export const SideBarMenu = () => {
  // setting theme in from the footer in sidebar
  const { theme, setTheme } = useTheme();
  /*
   * Store the active menuItem in state to force update
   * when changed
   */
  const [activeItem, setActiveItem] = useState('Top');

  /*
   * Create the list of MenuItems based on the sections object we have defined above
   */
  const menuList = Object.keys(menuItems).map((e, i) => (
    <MenuItem
      itemName={e}
      key={`menuitem_${i}`}
      active={e === activeItem ? true : false}
    />
  ));

  return (
    <Box
      as={'nav'}
      css={{
        px: '$1',
        py: '$1',
        '@sm': {
          top: 0,
        },
      }}
    >
      <Logo />

      <ul>{menuList}</ul>
      {/*  Footer items - to do, make a separate component to iterate items */}
      <ul style={{ marginTop: '10rem' }}>
        
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
        
      </ul>
    </Box>
  );
};

interface Props {
  children: React.ReactNode;
}