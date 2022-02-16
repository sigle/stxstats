import { HamburgerMenuIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { config } from '../config';
import { Box } from '../ui/Box';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';
import { Flex } from '../ui/Flex';
import { IconButton } from '../ui/IconButton';

interface NavItemProps {
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const NavItem = ({ children, ...props }: NavItemProps) => {
  const router = useRouter();
  return (
    <Box
      {...props}
      css={{
        py: '$3',
        px: '$3',
        br: '$2',
        alignSelf: 'start',
        backgroundColor:
          router.pathname === props.href ? '$gray5' : 'transparent',

        '&:hover': {
          backgroundColor:
            router.pathname === props.href ? undefined : '$gray5',
        },

        '&:active': {
          backgroundColor: '$gray5',
        },
      }}
      as="a"
    >
      {children}
    </Box>
  );
};

interface LayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case 'light':
      src = '/images/new_logo_stxstats_black.svg';
      break;
    case 'dark':
      src = '/images/new_logo_stxstats_white.svg';
      break;
    default:
      src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      break;
  }

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
              <Image height={38} width={81} src={src} alt="Stx stats logo" />
              <Flex css={{ mt: '$10' }} direction={'column'} gap={'2'}>
                <Link href={'/dashboard'} passHref>
                  <NavItem>Overview</NavItem>
                </Link>
                <Link href={'#'} passHref>
                  <NavItem>Price</NavItem>
                </Link>
                <Link href={'#'} passHref>
                  <NavItem>Mempool</NavItem>
                </Link>
                <Link href={'#'} passHref>
                  <NavItem>Smart contracts</NavItem>
                </Link>
                <Link href={'#'} passHref>
                  <NavItem>Wallets</NavItem>
                </Link>
                <Link href={'#'} passHref>
                  <NavItem>Pools</NavItem>
                </Link>
              </Flex>
            </Box>
            <Flex gap={'2'} direction={'column'}>
              <NavItem
                href={config.twitterUrl}
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </NavItem>
              <NavItem
                href={config.discordUrl}
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </NavItem>
              <Button
                as="a"
                href={config.landingUrl}
                target="_blank"
                rel="noreferrer"
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
            <Image height={38} width={81} src={src} alt="Stx stats logo" />
            <Flex
              css={{ mt: '$5', '@2xl': { mt: '$10' } }}
              direction={'column'}
              gap={'2'}
            >
              <Link href={'/dashboard'} passHref>
                <NavItem>Overview</NavItem>
              </Link>
              <Link href={'#'} passHref>
                <NavItem>Price</NavItem>
              </Link>
              <Link href={'#'} passHref>
                <NavItem>Mempool</NavItem>
              </Link>
              <Link href={'#'} passHref>
                <NavItem>Smart contracts</NavItem>
              </Link>
              <Link href={'#'} passHref>
                <NavItem>Wallets</NavItem>
              </Link>
              <Link href={'#'} passHref>
                <NavItem>Pools</NavItem>
              </Link>
            </Flex>
          </Box>
          <Flex gap={'2'} direction={'column'}>
            <NavItem href={config.twitterUrl} target="_blank" rel="noreferrer">
              Twitter
            </NavItem>
            <NavItem href={config.discordUrl} target="_blank" rel="noreferrer">
              Discord
            </NavItem>
            <Button
              css={{ alignSelf: 'start' }}
              as="a"
              href={config.landingUrl}
              target="_blank"
              rel="noreferrer"
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
