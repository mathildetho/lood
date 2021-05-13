import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InputProps } from '../Input/Input.component';
import InputError from '../InputError/InputError.component';
import Label from '../Label/Label.component';
import './PhotoInput.css';

const PhotoInput = ({
  onChange,
  name,
  label,
  required,
  isValid,
  value,
  error,
  type,
}: InputProps) => {
  const [file, setFile] = useState(null);

  const getUrlFile = (value) => {
    return Object.assign(value, {
      preview: URL.createObjectURL(value),
    });
  };

  useEffect(() => {
    if (value !== null) {
      setFile(getUrlFile(value));
    }
  }, [value]);

  useEffect(() => {
    if (file) {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(file.preview);
    }
  }, [file]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const newFile = getUrlFile(acceptedFile[0]);
      const reader = new FileReader();
      reader.onloadend = function () {
        const data = (reader.result as string).split(',')[1];
        newFile.data = atob(data);
      };
      reader.readAsDataURL(newFile);
      setFile(newFile);
      onChange && onChange(newFile);
    },
  });

  const deletePhoto = () => {
    onChange(null);
    setFile(null);
  };

  return (
    <>
      <Label name={name} label={label} required={required} isValid={isValid} />

      {!file && (
        <div {...getRootProps({ className: 'dropzone --margin-top-2' })}>
          <input type="file" name="photo" {...getInputProps()} />
          <div className="photo-input --bg-white" />
        </div>
      )}
      {file && (
        <div className="photo-preview --margin-top-2">
          <p
            className="photo__delete --white --body-text-small"
            onClick={deletePhoto}
          >
            enlever cette photo
          </p>
          <img
            className="photo-preview-img"
            src={file?.preview}
            alt={file.name}
          />
        </div>
      )}
      {error && <InputError error={error} />}
    </>
  );
};

export default PhotoInput;
