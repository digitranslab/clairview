import DocsMain from '@/app/_components/docs/DocsMain';
import { getDocsArticles } from '@/content/user-guide/constants/getDocsArticles';

export const metadata = {
  title: 'Clairview - Clairview UI',
  description: 'Clairview is a CRM designed to fit your unique business needs.',
  icons: '/images/core/logo.svg',
};

export const dynamic = 'force-dynamic';

export default async function ClairviewUIHome() {
  const filePath = 'src/content/clairview-ui/';
  const docsArticleCards = getDocsArticles(filePath);

  return <DocsMain docsArticleCards={docsArticleCards} />;
}
