import { portfolioMetadata } from '@/lib/metadata';
export const metadata = portfolioMetadata('en');
import { PortfolioPage } from '@/components/portfolio-page';
export default function Page() {
  return <PortfolioPage locale="en" />;
}
