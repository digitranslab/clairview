import { extractDomainFromLink } from 'src/modules/contact-creation-manager/utils/extract-domain-from-link.util';

describe('extractDomainFromLink', () => {
  it('should extract domain from link', () => {
    const link = 'https://www.clairview.io';
    const result = extractDomainFromLink(link);

    expect(result).toBe('clairview.io');
  });

  it('should extract domain from link without www', () => {
    const link = 'https://clairview.io';
    const result = extractDomainFromLink(link);

    expect(result).toBe('clairview.io');
  });

  it('should extract domain from link without protocol', () => {
    const link = 'clairview.io';
    const result = extractDomainFromLink(link);

    expect(result).toBe('clairview.io');
  });

  it('should extract domain from link with path', () => {
    const link = 'https://clairview.io/about';
    const result = extractDomainFromLink(link);

    expect(result).toBe('clairview.io');
  });
});
