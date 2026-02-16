import { TStagesList } from '../../types';
import { StagesAccordion } from '../StagesAccordion/StagesAccordion';

export function StagesList({
  list,
  clickedAccordion,
}:{
  list: TStagesList;
  clickedAccordion: () => unknown;
}) {
  return (
    <ul className="stages-list">
      {list.map(({
        title, description,
      }, index) => (
        <StagesAccordion
          key={title}
          title={title}
          description={description}
          index={index}
          clickedAccordion={clickedAccordion}
        />
      ))}
    </ul>
  );
}
