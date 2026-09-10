import { portfolioMetadata } from '@/lib/metadata';
export const metadata = portfolioMetadata('tr');
import { PortfolioPage } from '@/components/portfolio-page';
export default function Page() {
  return <PortfolioPage locale="tr" />;
}
