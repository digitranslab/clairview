// Extract "https://www.linkedin.com/company/clairview/" from any of the following urls, which the user can visit while on the company page.

import { isDefined } from '~/utils/isDefined';

// "https://www.linkedin.com/company/clairview/" "https://www.linkedin.com/company/clairview/about/" "https://www.linkedin.com/company/clairview/people/".
const extractCompanyLinkedinLink = (activeTabUrl: string) => {
  // Regular expression to match the company ID
  const regex = /\/company\/([^/]*)/;

  // Extract the company ID using the regex
  const match = activeTabUrl.match(regex);

  if (isDefined(match) && isDefined(match[1])) {
    const companyID = match[1];
    const cleanCompanyURL = `https://www.linkedin.com/company/${companyID}`;
    return cleanCompanyURL;
  }

  return '';
};

export default extractCompanyLinkedinLink;
