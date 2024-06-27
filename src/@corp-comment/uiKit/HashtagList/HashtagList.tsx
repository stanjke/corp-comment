import { useRootStore } from 'src/app/store';
import './HashtagList.scss';
import HashtagItem from './components/HashtagItem';

export default function HashtagList() {
  const companies = useRootStore((state) => state.companies);
  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <HashtagItem
          key={company}
          companyHashtag={company}
        />
      ))}
    </ul>
  );
}
