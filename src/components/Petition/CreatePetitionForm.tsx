import { FunctionComponent, useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createPetition } from '../../features/petitions/petitionsActions';
import { COUNTRY_LIST } from '../../common/constants';
import usePetitions from '../../common/hooks/usePetitions';

const CreatePetitionForm: FunctionComponent = () => {
  const petitions = usePetitions();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    country: 'Germany'
  });
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formValues.name && formValues.country && formValues.description) {
      setIsLoading(true);
      dispatch<any>(
        createPetition({
          name: formValues.name,
          description: formValues.description,
          country: formValues.country
        })
      );
    } else {
      alert('Not enough data');
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [petitions]);

  const setValue = (id: string, value: string) => {
    setFormValues((prevState) => {
      return { ...prevState, [id]: value };
    });
  };

  const onChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    setValue(id, value);
  };

  const countryOptions = Object.entries(COUNTRY_LIST).map(([shortName, longName]) => {
    return {
      key: shortName.toLowerCase(),
      value: longName,
      flag: shortName.toLowerCase(),
      text: longName
    };
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Form onSubmit={handleSubmit} loading={isLoading}>
      <Form.Field>
        <label>Name</label>
        <Form.Input
          required
          placeholder="Name"
          value={formValues.name}
          id="name"
          onChange={onChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <Form.TextArea
          required
          value={formValues.description}
          id="description"
          onChange={onChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Country</label>
        <Form.Dropdown
          id="country"
          onChange={(event: any, target: any) => {
            setValue('country', target.value);
          }}
          value={formValues.country}
          fluid
          search
          selection
          options={countryOptions}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CreatePetitionForm;
