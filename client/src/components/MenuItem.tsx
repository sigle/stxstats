// https://medium.com/the-coders-guide-to-javascript/smooth-scrolling-anchor-menu-in-reactjs-175030d0bce2
import { useState, useEffect } from 'react';
import { Box } from '../ui/Box';
import { Button } from '../ui/MenuButton';

/*
 * A single menu item
 * I deconstruct props to provide more readable code, allowing
 * any future coders to see exactly what props are expected
 */
export const MenuItem = ({
  itemName,
  active,
}: {
  itemName: string;
  active: boolean;
}) => {
  let name = '';
  switch (itemName) {
    case 'overview':
      name = 'Overview';
      break;
    case 'price':
      name = 'Price';
      break;
    case 'mempool':
      name = 'Mempool';
      break;
    case 'smart-contracts':
      name = 'Smart Contracts';
      break;
    case 'wallets':
      name = 'Wallets';
      break;
    case 'pools':
      name = 'Pools';
      break;

    default:
      throw new Error(`Unknown item ${itemName}`);
  }

  /*
   * Return the MenuItem as JSX
   * Remember to set your ariaLabel for accessability!
   */
  return (
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
        href={`#${itemName}`}
        className={active ? 'active' : ''}
        aria-label={`Scroll to ${itemName}`}
      >
        <Button
          css={{
            borderRadius: '$1',
          }}
        >
          {name}
        </Button>
      </Box>
    </Box>
  );
};
