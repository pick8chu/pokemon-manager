import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { createPokemon } from '../api/PokemonHandler';
import { PokemonInfo } from './PokemonCard';
import { ImageUploadForm } from './UploadImage';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  padding: 10px;
`;

interface EditProps {
  pokemon?: PokemonInfo;
  cb?: () => void;
}

export const ModalPokemon = (props: EditProps) => {
  const [tempPokemon, setTempPokemon] = useState<PokemonInfo>({} as PokemonInfo);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    props.cb && props.cb();
  };

  const handleSave = async () => {
    // UPDATE POKEMON
    await createPokemon(tempPokemon);
    handleClose();
  };

  useEffect(() => {
    setTempPokemon(props.pokemon || ({} as PokemonInfo));
  }, [props.pokemon]);

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShow(true)}>
        {props.pokemon ? 'Edit' : 'Add'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.pokemon ? 'Edit' : 'Add'} Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <StyledDiv>
              <label>Name</label>
              <input type="text" className="form-control" defaultValue={tempPokemon.name} onChange={e => setTempPokemon({ ...tempPokemon, name: e.target.value })} />
            </StyledDiv>
            <StyledDiv>
              <label>Image</label>
              <ImageUploadForm filename={tempPokemon.image} onChange={filename => setTempPokemon({ ...tempPokemon, image: filename })} />
            </StyledDiv>
            <StyledDiv>
              <label>Weight</label>
              <input type="number" className="form-control" defaultValue={tempPokemon.weight} onChange={e => setTempPokemon({ ...tempPokemon, weight: parseInt(e.target.value) })} />
            </StyledDiv>
            <StyledDiv>
              <label>Height</label>
              <input type="number" className="form-control" defaultValue={tempPokemon.height} onChange={e => setTempPokemon({ ...tempPokemon, height: parseInt(e.target.value) })} />
            </StyledDiv>
            {props.pokemon && (
              <StyledDiv>
                <label>Update Time</label>
                <span>{tempPokemon.updateDtm}</span>
              </StyledDiv>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {props.pokemon ? 'Edit' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
