import { eachDayOfInterval, format, fromUnixTime, getUnixTime } from 'date-fns';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Overview } from '../components/Overview';
import { config } from '../config';
import { PriceData, PriceResult, Result, StxStats } from '../types/FileData';
import { Container } from '../ui/Container';

// prevent flash of no content in graph by initializing range data with a constant value (1)
const today = new Date();
const fromDate = new Date(new Date().setDate(today.getDate() - 30));

const dates = eachDayOfInterval({
  start: fromDate,
  end: today,
});

const initialRange: Result[] = dates.map((date) => {
  return {
    value: 1,
    date: date.toString(),
  };
});

interface DashboardProps {
  stxStats: StxStats;
}

const Dashboard = ({ stxStats }: DashboardProps) => {
  const [priceData, setPriceData] = useState<PriceData | undefined>();
  const [priceEvolution, setPriceEvolution] = useState<Result[]>(initialRange);

  useEffect(() => {
    fetchPriceData();
  }, []);

  const fetchPriceData = async () => {
    const priceRes = await fetch(
      `${config.coingeckoApiUrl}/simple/price?ids=blockstack,bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
    );
    const priceData = await priceRes.json();

    const today = new Date();
    const fromDate = getUnixTime(
      new Date(new Date().setDate(today.getDate() - 30))
    );
    const toDate = getUnixTime(Date.now());

    const rangeRes = await fetch(
      `${config.coingeckoApiUrl}coins/blockstack/market_chart/range?vs_currency=usd&from=${fromDate}&to=${toDate}`
    );
    const rangeData = await rangeRes.json();

    const priceEvolutionRes: PriceResult[] = rangeData.prices;

    const stxPriceEvolution = priceEvolutionRes.map((element) => {
      return {
        date: element[0] as any,
        value: Number(element[1].toFixed(2)),
      };
    });

    setPriceEvolution(stxPriceEvolution);
    setPriceData(priceData);
  };

  return (
    <Container
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '$5',
        py: '$5',

        '@lg': {
          gap: '$20',
          flexDirection: 'row',
          height: '100vh',
        },

        '@xl': {
          gap: '128px',
        },

        '@2xl': {
          py: '$10',
        },
      }}
    >
      <DashboardLayout />
      <Overview
        stxStats={stxStats}
        priceData={priceData}
        priceEvolution={priceEvolution}
      />
    </Container>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL!}/dashboard`);
  const stxStats = await res.json();

  return {
    props: {
      stxStats,
    },
  };
}

export default Dashboard;
