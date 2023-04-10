import React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../api/api';

const ImgFrame = styled.img`
  max-width: 100%;
`;

const NoShowInput = styled.input`
  display: none;
`;

const ButtonLable = styled.label`
  width: 100%;
  display: inline-block;
  padding: 6px 12px;
  margin: 10px 0px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  cursor: pointer;
`;

interface Props {
  filename?: string;
  onChange: (filename: string) => void;
}

export const ImageUploadForm = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string | null>(props.filename || null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      await setFile(files[0]);
      console.log('file', file);
    }
  }

  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      // if (!file) {
      //     console.error('No file selected.');
      //     return;
      // }

      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await API.post('/pokemon/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setFilename(response.data.filename);
        props.onChange(response.data.filename);
      } catch (error) {
        setFile(null);
        alert('Error uploading file');
        console.error('Error uploading file:', error);
      }
    };

    uploadFile();
  }, [file]);

  return (
    <>
      <div>
        {(props.filename || filename) && <ImgFrame src={`http://localhost:8080/public/pokemon/pictures/${filename}`} alt={props.filename} />}
        <ButtonLable htmlFor="file-upload">
          Image Upload
          <NoShowInput id="file-upload" type="file" name="photo" onChange={handleFileChange} />
        </ButtonLable>
      </div>
    </>
  );
}
