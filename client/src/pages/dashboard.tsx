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

let initialRange: Result[] = [];

const dates = eachDayOfInterval({
  start: fromDate,
  end: today,
});

dates.forEach((date) => {
  const dateAsString = date.toString();

  const target = {
    date: dateAsString,
    value: 1,
  };

  const toObj = Object.assign({}, target);

  initialRange.push(toObj);
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
    console.log(rangeData);

    const priceEvolutionRes: PriceResult[] = rangeData.prices;

    let stxPriceEvolution: Result[] = [];

    priceEvolutionRes.forEach((element) => {
      const formattedDate = format(
        fromUnixTime(element[0] / 1000),
        'yyyy-MM-dd'
      );

      const target = {
        date: formattedDate,
        value: Number(element[1].toFixed(1)),
      };

      const toObj = Object.assign({}, target);

      stxPriceEvolution.push(toObj);
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
          py: '$10',
          height: '100vh',
        },

        '@xl': {
          gap: '128px',
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

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL!}/dashboard`);
  const stxStats = await res.json();

  return {
    props: {
      stxStats,
    },
  };
}

export default Dashboard;
