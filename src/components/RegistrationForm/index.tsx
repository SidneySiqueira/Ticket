import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

import * as S from './styled';
import { RootState } from '../../redux/store';
import { AddApi } from '../../redux/apiSlice';
import { InfoProps } from '../../Types/types';

interface RegistrationFormProps {
  setBackLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialFormData = {
  name: '',
  email: '',
  password: '',
  cellPhone: '',
  isAdmin: false,
};

const RegistrationForm = ({ setBackLogin }: RegistrationFormProps) => {
  const [formData, setFormData] = useState(initialFormData);
  const [firstEmail, setFirstEmail] = useState('');
  const [secondEmail, setSecondEmail] = useState('');
  const [validationErrors, setValidationErrors] = useState<InfoProps>(initialFormData);

  const dispatch: ThunkDispatch<RootState, undefined, Action<any>> =
    useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Digite um email válido').required('O email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
    cellPhone: yup.string().required('O telefone de contato é obrigatório')
  });

  useEffect(() => {
    if (firstEmail === secondEmail) {
      setFormData({ ...formData, email: firstEmail });
    }
  }, [secondEmail]);

  const handleRegistration = () => {
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        handlePost(formData);
        setValidationErrors(initialFormData);
        setBackLogin(false);
        setFormData(initialFormData);
      })
      .catch((error) => {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((e: { path: string | number; message: string }) => {
          errors[String(e.path)] = e.message;
        });
        setValidationErrors(errors as unknown as InfoProps);
      });
  };

  const handlePost = async (data: InfoProps) => {
    await dispatch(AddApi(data));
  };

  return (
    <S.Container>
      <S.Input
        placeholder="Nome"
        value={formData.name}
        onChangeText={(text: string) => setFormData({ ...formData, name: text })}
      />
      <S.AlertError>{validationErrors.name}</S.AlertError>
      <S.Input
        placeholder="Email"
        value={firstEmail}
        onChangeText={(text: string) => setFirstEmail(text)}
      />
      <S.AlertError>{validationErrors.email}</S.AlertError>
      <S.Input
        placeholder="Confirmar Email"
        value={secondEmail}
        onChangeText={(text: string) => setSecondEmail(text)}
      />
      <S.AlertError>{validationErrors.email}</S.AlertError>
      <S.Input
        placeholder="Senha"
        secureTextEntry
        value={formData.password}
        onChangeText={(text: string) => setFormData({ ...formData, password: text })}
      />
      <S.AlertError>{validationErrors.password}</S.AlertError>
      <S.InputPhone
        placeholder="Celular (WhatsApp)"
        type="cel-phone"
        value={formData.cellPhone}
        onChangeText={(text: string) => setFormData({ ...formData, cellPhone: text })}
      />
      <S.AlertError>{validationErrors.cellPhone}</S.AlertError>
      <RadioButton.Group
        onValueChange={(value) => setFormData({ ...formData, isAdmin: value === 'admin' })}
        value={formData.isAdmin ? 'admin' : 'client'}
      >
        <RadioButton.Item label="Cliente" value="client" />
        <RadioButton.Item label="Administrador" value="admin" />
      </RadioButton.Group>
      <S.CustomButton onPress={handleRegistration}>
        <S.CustomButtonText>Cadastrar</S.CustomButtonText>
      </S.CustomButton>
    </S.Container>
  );
};

export default RegistrationForm;

