import { ReactNode } from 'react';

import { DocsMainLayout } from '@/app/_components/docs/DocsMainLayout';
import { getDocsArticles } from '@/content/user-guide/constants/getDocsArticles';

export default function ClairviewUILayout({ children }: { children: ReactNode }) {
  const filePath = 'src/content/clairview-ui/';
  const getAllArticles = true;
  const docsIndex = getDocsArticles(filePath, getAllArticles);
  return <DocsMainLayout docsIndex={docsIndex}>{children}</DocsMainLayout>;
}
