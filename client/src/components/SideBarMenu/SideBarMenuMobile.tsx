import { Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Box } from '../../ui/Box';
import { Footer } from '../Footer';
import { Logo } from '../Logo';
import { MenuItem } from '../MenuItem';

/*
 * Sidebar menu + footer menu
 */
const menuItems: { [key: string]: any } = {
  overview: null,
  price: null,
  mempool: null,
  'smart-contracts': null,
  wallets: null,
  pools: null,
};

export const SideBarMenuMobile = () => {
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
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: '$3',
        }}
      >
        <Logo />
        <Cross1Icon />
      </Box>

      <ul>{menuList}</ul>
      {/*  Footer items - to do, make a separate component to iterate items */}
      <ul style={{ marginTop: '10rem' }}>
        <Footer />
      </ul>
    </Box>
  );
};

interface Props {
  children: React.ReactNode;
}
