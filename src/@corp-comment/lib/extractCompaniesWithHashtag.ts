import { addHashtag } from './addHashtag';
import { FeedbackType } from './types';

export const extractCompaniesWithHashtag = (companies: FeedbackType[]) =>
  companies.map(({ companyName }) => addHashtag(companyName));
