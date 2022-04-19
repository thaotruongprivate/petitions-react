import React, { FunctionComponent } from 'react';
import { Petition } from '../../common/types';
import { List, ListContent, ListDescription, ListHeader } from 'semantic-ui-react';

const PetitionComponent: FunctionComponent<Petition> = (props) => {
  return (
    <List.Item>
      <ListContent>
        <ListHeader>
          {props.name} - {props.country} - created on {props.dateCreated.toLocaleString()}
        </ListHeader>
        <ListDescription>{props.description}</ListDescription>
      </ListContent>
    </List.Item>
  );
};

export default PetitionComponent;
