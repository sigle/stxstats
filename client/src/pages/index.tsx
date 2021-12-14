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


const TextStats = styled('div', {
  color: '#F76808',
  weight: 700,
  fontSize: '$6',
  fontWeight: '$bold',
  paddingTop: '$6',
  paddingBottom: '$6',
  paddingLeft: '$2',
});

const Title = styled('div', {
  color: '#A1A1A1',
  weight: 300,
  fontSize: '$2',
  paddingLeft: '$2',
  paddingBottom: '$4',
});

const Flex = styled('div', { display: 'flex' });

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
            {/*  Chart */}
            <Stack
              direction={{
                '@initial': 'column',
                '@sm': 'row',
              }}
              css={{
               
                pt: '$5' }}
            >
              

              <PlaceHolder>
            <ExampleChart />
            </PlaceHolder>

              <PlaceHolder>


              <Stack direction="column" css={{ stackGap: "$4" }}>
              <Title>STX price</Title>
              <Separator
                    decorative
                    orientation="vertical"
                    css={{ margin: '0 15px' }}
                  />
                <div> 
                  <TextStats>$2,46</TextStats>
                  </div>
                <div >
                <Title>24h volume</Title>
                <TextStats>1.3B</TextStats>
                </div>
                <div >
                <Title>Market cap (fully diluted)</Title>
                <TextStats>86B</TextStats>
                </div>
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
                  <TextStats>2</TextStats>
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
                  <TextStats>36</TextStats>
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
                  <TextStats>23,092 STX</TextStats>
                  <Separator
                    decorative
                    orientation="vertical"
                    css={{ margin: '0 15px' }}
                  />
                  <TextStats>2</TextStats>
                </Flex>
              </PlaceHolder>
              <PlaceHolder>
                <Title>BTC price</Title>
                <Flex css={{ height: 20, alignItems: 'center' }}>
                  <TextStats>$580,314 BTC</TextStats>
                  <Separator
                    decorative
                    orientation="vertical"
                    css={{ backgroundColor: '$gray4', marginLeft: '$2' }}
                  />
                  <text style={{ color: '#1DD4B4' }}>11%</text>
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
