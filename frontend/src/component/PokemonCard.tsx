import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ModalPokemon } from './ModalPokemon';
import { removePokemon } from '../api/PokemonHandler';
import { ModalComp } from './ModalComp';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface PokemonInfo {
  id: string;
  image: string;
  name: string;
  weight: number;
  height: number;
  updateDtm: string;
}

type Props = PokemonInfo;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const PokemonCard = (props: Props) => {
  const [showConfirmModal, setShowConfirmModal] = React.useState<boolean>(false);

  const handleRemove = async () => {
    await removePokemon(props.id);
    onClickRemove2();
  };

  const onClickRemove = () => {
    setShowConfirmModal(true);
  };
  const onClickRemove2 = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <Card style={{ width: '15rem' }}>
        <ImageWrapper>{props.image ? <Card.Img variant="top" src={`http://localhost:8080/public/pokemon/pictures/${props.image}`} /> : <span>Image Not Exist</span>}</ImageWrapper>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>Weight: {props.weight}</Card.Text>
          <Card.Text>Height: {props.height}</Card.Text>
          <Card.Text>Update Time: {props.updateDtm}</Card.Text>
          <ButtonDiv>
            <Button variant="outline-danger" onClick={onClickRemove}>
              Delete
            </Button>
            <ModalPokemon pokemon={props} />
          </ButtonDiv>
        </Card.Body>
      </Card>

      {showConfirmModal && <ModalComp title="Confirm" body="Removing confirm" onCancel={onClickRemove2} onConfirm={handleRemove} />}
    </>
  );
};
