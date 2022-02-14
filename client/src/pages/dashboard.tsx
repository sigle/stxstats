import { format, fromUnixTime, getUnixTime } from 'date-fns';
import { DashboardLayout } from '../components/DashboardLayout';
import { Overview } from '../components/Overview';
import { DashboardData, PriceResult } from '../types/FileData';
import { Container } from '../ui/Container';

interface DashboardProps {
  statsData: DashboardData;
}

const Dashboard = ({ statsData }: DashboardProps) => {
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
      <Overview statsData={statsData} />
    </Container>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL!}/dashboard`);
  const stxStats = await res.json();

  const priceRes = await fetch(process.env.STX_PRICE_API_URL!);
  const priceData = await priceRes.json();

  const today = new Date();
  const fromDate = getUnixTime(
    new Date(new Date().setDate(today.getDate() - 30))
  );
  const toDate = getUnixTime(Date.now());

  const rangeRes = await fetch(
    `${process.env.RANGE_API_URL}from=${fromDate}&to=${toDate}`
  );
  const rangeData = await rangeRes.json();
  const priceEvolutionRes: PriceResult[] = rangeData.prices;

  let stxPriceEvolution: {}[] = [];

  priceEvolutionRes.forEach((element) => {
    const formattedDate = format(fromUnixTime(element[0] / 1000), 'yyyy-MM-dd');

    const target = { date: formattedDate, value: element[1].toFixed(1) };

    const toObj = Object.assign({}, target);

    stxPriceEvolution.push(toObj);
  });

  return {
    props: {
      statsData: {
        stxStats,
        priceData,
        stxPriceEvolution,
      },
    },
  };
}

export default Dashboard;
