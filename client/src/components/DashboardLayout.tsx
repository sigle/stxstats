import { HamburgerMenuIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box } from '../ui/Box';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';
import { Flex } from '../ui/Flex';
import { IconButton } from '../ui/IconButton';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const NavItem = ({ href, children }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <Box
        css={{
          py: '$3',
          px: '$3',
          br: '$2',
          alignSelf: 'start',
          backgroundColor: router.pathname === href ? '$gray5' : 'transparent',

          '&:hover': {
            backgroundColor: router.pathname === href ? undefined : '$gray5',
          },

          '&:active': {
            backgroundColor: '$gray5',
          },
        }}
        target={href.includes('https') ? '_blank' : undefined}
        rel="noreferrer"
        as="a"
      >
        {children}
      </Box>
    </Link>
  );
};

interface LayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <IconButton
            css={{
              alignSelf: 'start',
              '@lg': {
                display: 'none',
              },
            }}
          >
            <HamburgerMenuIcon />
          </IconButton>
        </DialogTrigger>
        <DialogContent>
          <Flex
            css={{ flex: 1 }}
            as={'nav'}
            direction={'column'}
            justify={'between'}
            align={'start'}
          >
            <Box>
              {mounted === true ? (
                theme === 'dark' ? (
                  <Image
                    height={38}
                    width={81}
                    src={'/images/new_logo_stxstats_white.svg'}
                    alt="Stx stats logo"
                    priority
                  />
                ) : (
                  <Image
                    height={38}
                    width={81}
                    src={'/images/new_logo_stxstats_black.svg'}
                    alt="Stx stats logo"
                    priority
                  />
                )
              ) : (
                <Box css={{ height: 38 }} />
              )}
              <Flex css={{ mt: '$10' }} direction={'column'} gap={'2'}>
                <NavItem href={'/dashboard'}>Overview</NavItem>
                <NavItem href={'#'}>Price</NavItem>
                <NavItem href={'#'}>Mempool</NavItem>
                <NavItem href={'#'}>Smart contracts</NavItem>
                <NavItem href={'#'}>Wallets</NavItem>
                <NavItem href={'#'}>Pools</NavItem>
              </Flex>
            </Box>
            <Flex gap={'2'} direction={'column'}>
              <NavItem href="https://twitter.com/sigleapp">Twitter</NavItem>
              <NavItem href="https://discord.gg/PsMxnkqunJ">Discord</NavItem>
              <Button
                as="a"
                href="https://www.sigle.io/"
                target="_blank"
                size={'lg'}
              >
                Visit Sigle.io
              </Button>
              <Button
                css={{ alignSelf: 'start', display: 'flex', gap: '$2' }}
                variant={'ghost'}
                onClick={() =>
                  theme === 'dark' ? setTheme('light') : setTheme('dark')
                }
              >
                Mode
                <SunIcon />
              </Button>
            </Flex>
          </Flex>
        </DialogContent>
      </Dialog>

      <Container
        css={{
          display: 'none',

          '@lg': {
            display: 'block',
            inset: 'unset',
            py: 0,
            mx: 0,
          },
        }}
      >
        <Flex
          css={{ height: '100%' }}
          as={'nav'}
          direction={'column'}
          justify={'between'}
        >
          <Box>
            {mounted === true ? (
              theme === 'dark' ? (
                <Image
                  height={38}
                  width={81}
                  src={'/images/new_logo_stxstats_white.svg'}
                  alt="Stx stats logo"
                  priority
                />
              ) : (
                <Image
                  height={38}
                  width={81}
                  src={'/images/new_logo_stxstats_black.svg'}
                  alt="Stx stats logo"
                  priority
                />
              )
            ) : (
              <Box css={{ height: 38 }} />
            )}
            <Flex css={{ mt: '$10' }} direction={'column'} gap={'2'}>
              <NavItem href={'/dashboard'}>Overview</NavItem>
              <NavItem href={'#'}>Price</NavItem>
              <NavItem href={'#'}>Mempool</NavItem>
              <NavItem href={'#'}>Smart contracts</NavItem>
              <NavItem href={'#'}>Wallets</NavItem>
              <NavItem href={'#'}>Pools</NavItem>
            </Flex>
          </Box>
          <Flex gap={'2'} direction={'column'}>
            <NavItem href="https://twitter.com/sigleapp">Twitter</NavItem>
            <NavItem href="https://discord.gg/PsMxnkqunJ">Discord</NavItem>
            <Button
              css={{ alignSelf: 'start' }}
              as="a"
              href="https://www.sigle.io/"
              target="_blank"
              size={'lg'}
            >
              Visit Sigle.io
            </Button>
            <Button
              css={{ alignSelf: 'start', display: 'flex', gap: '$2' }}
              variant={'ghost'}
              onClick={() =>
                theme === 'dark' ? setTheme('light') : setTheme('dark')
              }
            >
              Mode
              <SunIcon />
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
