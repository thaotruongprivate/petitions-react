import React, { FunctionComponent } from 'react';
import Petition from '../Petition/Petition';
import usePetitions from '../../common/hooks/usePetitions';
import { CreatePetitionForm } from '../Petition';
import { List } from 'semantic-ui-react';

const BasePage: FunctionComponent = () => {
  const petitions = usePetitions();
  const list =
    petitions.length === 0 ? (
      <div>There are currently no petitions</div>
    ) : (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <List>
        {petitions
          .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
          .map((petition) => {
            return <Petition key={petition.id} {...petition} />;
          })}
      </List>
    );

  return (
    <div>
      <h2>Please add a petition</h2>
      <CreatePetitionForm />
      {list}
    </div>
  );
};

export default BasePage;
