import { removeHashtag } from '@corp-comment/lib/removeHashtag';
import { MouseEvent } from 'react';
import { useRootStore } from 'src/app/store';

type HashtagItemProps = {
  companyHashtag: string;
};

export default function HashtagItem({ companyHashtag }: HashtagItemProps) {
  const setSelectedCompany = useRootStore((state) => state.setSelectedCompany);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedCompany(removeHashtag(companyHashtag));
  };

  return (
    <li>
      <button onClick={handleClick}>{companyHashtag}</button>
    </li>
  );
}
