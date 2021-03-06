import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { PriceData, Result, StxStats } from '../types/FileData';
import { Box } from '../ui/Box';
import { Flex } from '../ui/Flex';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import {
  getLastBlockTime,
  getNextCycle,
  microToStacks,
  numberWithCommas,
  numFormatter,
} from '../utils';
import { PriceEvolution } from './PriceEvolution';

interface OverviewProps {
  stxStats: StxStats;
  priceData: PriceData | undefined;
  priceEvolution: Result[];
}

export const Overview = ({
  stxStats,
  priceData,
  priceEvolution,
}: OverviewProps) => {
  const stxPercentage = priceData
    ? priceData?.blockstack.usd_24h_change
    : undefined;

  const btcPercentage = priceData
    ? priceData?.bitcoin.usd_24h_change
    : undefined;

  return (
    <Box
      css={{
        '@lg': {
          flex: 1,
        },
      }}
    >
      <Heading css={{ mb: '$5', '@2xl': { mb: '$10' } }} as="h1" size={'2xl'}>
        Overview
      </Heading>

      <Box
        css={{
          backgroundColor: '$gray2',
          mb: '$5',
          gap: '$3',

          '@lg': {
            display: 'flex',
            py: '$5',
          },
        }}
      >
        <Box
          css={{
            mb: '$6',
            position: 'relative',
            width: '100%',
            height: 300,
          }}
        >
          <Box
            css={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
            }}
          >
            <Text as="h3" size="xs" css={{ pl: '$4' }}>
              Price evolution (last 30 days)
            </Text>
            <PriceEvolution priceEvolution={priceEvolution} />
          </Box>
        </Box>
        <Box
          css={{
            display: 'none',
            width: 2,
            height: 250,
            backgroundColor: '$gray6',
            my: 'auto',

            '@lg': {
              display: 'block',
            },
          }}
        />

        <Flex css={{ p: '$3' }} direction={'column'} gap="5">
          <Box>
            <Text as="h3" size="xs" css={{ mb: '$1' }}>
              STX price
            </Text>
            {priceData ? (
              <Flex
                css={{
                  gap: '$2',

                  '@lg': {
                    gap: 0,
                  },
                }}
              >
                <Heading size={'2xl'} css={{ color: '$orange11' }}>
                  <Box css={{ color: '$orange9' }} as="span">
                    $
                  </Box>
                  {priceData?.blockstack.usd}
                </Heading>
                <Text
                  css={{
                    fontSize: '$1',
                    color:
                      stxPercentage && stxPercentage > 0
                        ? '$green11'
                        : '$red11',
                  }}
                >
                  <Box
                    as="span"
                    css={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    {stxPercentage && stxPercentage > 0 ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </Box>
                  {priceData?.blockstack.usd_24h_change.toFixed()}%
                </Text>
              </Flex>
            ) : (
              <Box css={{ height: '$8' }} />
            )}
          </Box>
          <Box>
            <Text as="h3" size="xs" css={{ mb: '$1' }}>
              24h volume
            </Text>
            {priceData ? (
              <Heading size={'2xl'} css={{ color: '$orange11' }}>
                {numFormatter(priceData.blockstack.usd_24h_vol)}
              </Heading>
            ) : (
              <Box css={{ height: '$8' }} />
            )}
          </Box>
          <Box>
            <Text as="h3" size="xs" css={{ mb: '$1', color: '$gray9' }}>
              Market cap (fully diluted)
            </Text>
            <Heading size={'2xl'} css={{ color: '$orange11' }}>
              {''}
              {numFormatter(priceData?.blockstack.usd_market_cap)}
            </Heading>
          </Box>
        </Flex>
      </Box>

      <Flex
        wrap={'wrap'}
        gap={'5'}
        direction={{
          '@initial': 'column',
          '@lg': 'row',
        }}
      >
        <Flex
          css={{
            backgroundColor: '$gray2',
            p: '$3',
            borderRadius: '$2',
            gap: '$3',

            '@md': {
              flex: 'auto',
            },
          }}
          justify={'between'}
          direction={'row'}
        >
          <Box css={{ width: '100%' }}>
            <Text as="h3" size="xs" css={{ mb: '$2' }}>
              Block height
            </Text>
            <Heading size={'2xl'} css={{ color: '$orange11' }}>
              {numberWithCommas(stxStats.blockHeight)}
            </Heading>
          </Box>
          <Box
            css={{
              display: 'block',
              width: 2,
              height: 80,
              backgroundColor: '$gray6',
            }}
          />
          <Box css={{ pl: '$3', width: '100%' }}>
            <Text as="h3" size="xs" css={{ mb: '$2' }}>
              Last block (minutes)
            </Text>
            <Heading size={'2xl'} css={{ color: '$orange11' }}>
              {getLastBlockTime(stxStats.lastBlockTime)}
            </Heading>
          </Box>
        </Flex>

        <Flex
          css={{
            backgroundColor: '$gray2',
            p: '$3',
            borderRadius: '$2',
            gap: '$3',
            '@md': {
              flex: 'auto',
            },
          }}
          justify={'between'}
          direction={{
            '@initial': 'column',
            '@md': 'row',
          }}
        >
          <Box css={{ width: '100%' }}>
            <Text as="h3" size="xs" css={{ mb: '$2' }}>
              Total Transactions
            </Text>
            <Heading size={'2xl'} css={{ color: '$orange11' }}>
              {numberWithCommas(stxStats.totalTransactions)}
            </Heading>
          </Box>
          <Box
            css={{
              width: 2,
              height: 80,
              backgroundColor: '$gray6',
              display: 'none',
              '@md': {
                display: 'block',
              },
            }}
          />
          <Box css={{ width: '100%', '@lg': { pl: '$3' } }}>
            <Text as="h3" size="xs" css={{ mb: '$2' }}>
              Transactions last 24h
            </Text>
            <Heading size={'2xl'} css={{ color: '$orange11' }}>
              {numberWithCommas(stxStats.transactionsLast24h)}
            </Heading>
          </Box>
        </Flex>

        <Flex
          css={{
            backgroundColor: '$gray2',
            p: '$3',
            borderRadius: '$2',
            gap: '$3',
            '@md': {
              flex: 'auto',
            },
          }}
          justify={'between'}
          direction={{
            '@initial': 'column',
            '@md': 'row',
          }}
        >
          <Box
            css={{
              '@xl': {
                width: '100%',
              },
            }}
          >
            <Text as="h3" size="xs" css={{ mb: '$2' }}>
              Total stacked
            </Text>
            <Heading size={'2xl'} css={{ color: '$orange11' }}>
              {numberWithCommas(microToStacks(stxStats.totalStacked).toFixed())}{' '}
              <Box css={{ color: '$orange9' }} as="span">
                STX
              </Box>
            </Heading>
          </Box>
          <Box
            css={{
              display: 'flex',
              width: '50%',
            }}
          >
            <Box
              css={{
                display: 'none',
                width: 2,
                height: 80,
                backgroundColor: '$gray6',
                '@md': {
                  display: 'block',
                },
              }}
            />
            <Box css={{ '@md': { pl: '$3' } }}>
              <Text as="h3" size="xs" css={{ mb: '$2' }}>
                Next cycle (days)
              </Text>
              <Heading size={'2xl'} css={{ color: '$orange11' }}>
                {getNextCycle(stxStats.nextCycleIn)}
              </Heading>
            </Box>
          </Box>
        </Flex>

        <Flex
          css={{
            backgroundColor: '$gray2',
            p: '$3',
            borderRadius: '$2',
            '@md': {
              flex: 'auto',
            },
          }}
          gap={'3'}
          justify={'between'}
          direction={{
            '@initial': 'column',
            '@lg': 'row',
          }}
        >
          <Box>
            <Text as="h3" size="xs" css={{ mb: '$2' }}>
              BTC price
            </Text>
            {priceData ? (
              <Flex gap={'2'}>
                <Heading size={'2xl'} css={{ color: '$orange11' }}>
                  <Box css={{ color: '$orange9' }} as="span">
                    $
                  </Box>
                  {numberWithCommas(priceData?.bitcoin.usd)}
                </Heading>
                <Text
                  css={{
                    fontSize: '$2',
                    color:
                      btcPercentage && btcPercentage > 0
                        ? '$green11'
                        : '$red11',
                  }}
                >
                  <Box
                    as="span"
                    css={{ display: 'inline-block', verticalAlign: 'middle' }}
                  >
                    {btcPercentage && btcPercentage > 0 ? (
                      <ArrowUpIcon />
                    ) : (
                      <ArrowDownIcon />
                    )}
                  </Box>
                  {priceData?.bitcoin.usd_24h_change.toFixed()}%
                </Text>
              </Flex>
            ) : (
              <Box css={{ width: '150px' }} />
            )}
          </Box>
          <Box
            css={{
              minWidth: '220px',
            }}
          />
          <Box />
        </Flex>
      </Flex>
    </Box>
  );
};
