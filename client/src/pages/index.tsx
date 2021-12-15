import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HamburgerMenuIcon, SunIcon } from '@radix-ui/react-icons';
import { NbTxsPerDay } from '../components/NbTxsPerDay';
import { UniqueAddressGrowingPerDay } from '../components/UniqueAddressGrowingPerDay';
import { TxsFeePerDay } from '../components/TxsFeePerDay';
import { Menu } from '../components/Menu';
import { Container } from '../ui/Container';
import { Box } from '../ui/Box';
import { Heading } from '../ui/Heading';
import { Link } from '../ui/Link';
import { Text } from '../ui/Text';
import { Footer } from '../components/Footer';
import { IconButton } from '../ui/IconButton';
import { FileData } from '../types/FileData';
import { ActiveAddressesPerDay } from '../components/ActiveAddressesPerDay';
import { SideBarMenu } from '../components/SideBarMenu/SideBarMenu';
import { Stack } from '../ui/Stack';
import { styled } from '../stitches.config';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Dialog } from '../ui/Dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { keyframes } from '@stitches/react';
import ExampleChart from '../components/ExampleChart';

interface HomeProps {
  statsData: FileData;
}

// importing separator for use in stats info
const StyledSeparator = styled(SeparatorPrimitive.Root, {
  backgroundColor: '$gray6',
  '&[data-orientation=vertical]': { height: '100%', width: 2 },
});

export const Separator = StyledSeparator;

// adding individual style for responsiveness - to do bring styles to a separate page
const PlaceHolder = styled('div', {
  minHeight: '50px',
  minWidth: '50px',
  padding: '$4',
  fontSize: '$xl',
  flexGrow: 1,
  backgroundColor: '$gray4',
  borderRadius: '5px',
});

// style for text and titles inside overview boxes
const TextStats = styled('div', {
  color: '#F76808',
  weight: 700,
  fontSize: '$6',
  fontWeight: '$bold',
  paddingTop: '$6',
  paddingBottom: '$6',
  paddingLeft: '$2',
});

const TextOverview = styled('div', {
  color: '#F76808',
  weight: 700,
  fontSize: '$6',
  fontWeight: '$bold',
  padding: 0,
  margin: 0,
});

const TitleOverview = styled('div', {
  color: '#A1A1A1',
  weight: 300,
  fontSize: '$2',
  padding: 0,
  margin: 0,
});

const Title = styled('div', {
  color: '#A1A1A1',
  weight: 300,
  fontSize: '$2',
  paddingLeft: '$2',
  paddingBottom: '$4',
});

// flex box to add responsiveness
const Flex = styled('div', { display: 'flex' });

// dialog style when mobile sidebar is open
const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-100%)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  transform: 'translateX(0)',
  maxWidth: '100%',
  maxHeight: '100%',
  overflowY: 'auto',
  width: '16rem',
  backgroundColor: '$gray1',
  margin: 0,
  padding: 0,
  borderRadius: 0,
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    willChange: 'translateX',
  },
});

const SideBarContainer = styled('div', {});

const Home = ({ statsData }: HomeProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleCloseMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <Container>
        <Box
          css={{
            mt: 0,
            display: 'grid',
            gridTemplateColumns: '1fr',
            '@lg': {
              gridTemplateColumns: '1fr 3fr',
            },
          }}
        >
          <Dialog open={mobileMenuOpen} onOpenChange={handleCloseMobileMenu}>
            <StyledDialogContent aria-label="Mobile menu">
              <SideBarMenu />
            </StyledDialogContent>
          </Dialog>

          <SideBarContainer>
            <SideBarMenu />
          </SideBarContainer>

          <Box css={{ pb: '$4', pt: '$8' }}>
            <IconButton
              css={{
                '@sm': {
                  display: 'contents',
                },
                '@lg': {
                  display: 'none',
                },
              }}
            >
              <HamburgerMenuIcon
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </IconButton>
            <Heading as={'h3'} size={'xl'} css={{ fontWeight: 700, pb: '$8' }}>
              Overview
            </Heading>
            {/*  Overview Chart */}
            <Stack
              direction={{
                '@initial': 'column',
                '@sm': 'row',
              }}
              css={{
                pt: '$5',
              }}
            >
              <PlaceHolder css={{ borderRadius: '5px 0px 0px 5px' }}>
                <Box id="number-of-txs" css={{ pt: '$4' }}>
                  <Text size={'sm'}>Price evolution (last 30 days)</Text>
                  <Box css={{ position: 'relative', height: 200, mt: '$4' }}>
                    <Box
                      css={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        left: 0,
                        top: 0,
                      }}
                    >
                      <NbTxsPerDay statsData={statsData.nbTxsPerDay} />
                    </Box>
                  </Box>
                </Box>
              </PlaceHolder>

              <PlaceHolder css={{ borderRadius: '0px 5px 5px 0px' }}>
                <Stack direction="column" css={{}}>
                  <Title>STX price</Title>
                  <TextOverview>
                    $2,46{' '}
                    <text
                      style={{
                        color: '#1DD4B4',
                        fontSize: '13px',
                        alignItems: 'center',
                      }}
                    >
                      22%
                    </text>
                  </TextOverview>

                  <TitleOverview>24h volume</TitleOverview>
                  <TextOverview>
                    1.3B{' '}
                    <text
                      style={{
                        color: '#1DD4B4',
                        fontSize: '13px',
                        alignItems: 'center',
                      }}
                    >
                      8%
                    </text>
                  </TextOverview>

                  <TitleOverview>Market cap (fully diluted)</TitleOverview>
                  <TextOverview>86B</TextOverview>
                </Stack>
              </PlaceHolder>
            </Stack>

            {/*  Stack responsive boxes with stats info */}
            <Stack
              direction={{
                '@initial': 'column',
                '@sm': 'row',
              }}
              css={{ stackGap: '$4', pt: '$5' }}
            >
              <PlaceHolder>
                <Title>Block Height</Title>
                <Flex css={{ height: 20, alignItems: 'center' }}>
                  <TextStats>55,409,264</TextStats>
                  <Separator
                    decorative
                    orientation="vertical"
                    css={{ margin: '0 15px' }}
                  />
                  <div>
                    <Title css={{ padding: 0 }}>Last block (minutes)</Title>
                    <TextStats css={{ padding: 0, marginBottom: '$6' }}>
                      2
                    </TextStats>
                  </div>
                </Flex>
              </PlaceHolder>
              <PlaceHolder>
                <Title>Total transactions</Title>
                <Flex css={{ height: 20, alignItems: 'center' }}>
                  <TextStats>42,501,750</TextStats>
                  <Separator
                    decorative
                    orientation="vertical"
                    css={{ margin: '0 15px' }}
                  />
                  <div>
                    <Title css={{ padding: 0 }}>Total transactions</Title>
                    <TextStats css={{ padding: 0, marginBottom: '$5' }}>
                      36
                    </TextStats>
                  </div>
                </Flex>
              </PlaceHolder>
            </Stack>
            <Stack
              direction={{
                '@initial': 'column',
                '@sm': 'row',
              }}
              css={{ stackGap: '$4', pt: '$5' }}
            >
              <PlaceHolder>
                <Title>Total stacked</Title>
                <Flex css={{ height: 20, alignItems: 'center' }}>
                  <TextStats>
                    23,092 <text style={{ color: '#BC410D' }}>STX</text>
                  </TextStats>
                  <Separator
                    decorative
                    orientation="vertical"
                    css={{ margin: '0 15px' }}
                  />
                  <div>
                    <Title css={{ padding: 0 }}>Next cycle (in days)</Title>
                    <TextStats css={{ padding: 0, marginBottom: '$6' }}>
                      8
                    </TextStats>
                  </div>
                </Flex>
              </PlaceHolder>
              <PlaceHolder>
                <Title>BTC price</Title>
                <Flex css={{ height: 20, alignItems: 'center' }}>
                  <TextStats>$42,501,750</TextStats>
                  <Separator
                    decorative
                    orientation="vertical"
                    css={{ backgroundColor: '$gray4', marginLeft: '$2' }}
                  />
                  <text style={{ color: '#1DD4B4' }}>11%</text>
                  <text style={{ color: '#282828' }}>00000000</text>
                </Flex>
              </PlaceHolder>
            </Stack>
          </Box>
        </Box>
      </Container>
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
