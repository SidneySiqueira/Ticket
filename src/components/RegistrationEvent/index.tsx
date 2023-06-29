import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import moment from 'moment';

import * as S from './styled';
import { RootState } from '../../redux/store';
import { AddApiEvent } from '../../redux/apiEventsSlice';
import { Button } from 'react-native';
import formatarData from '../../pages/utils/formatarData';
import { EventProps, EventsProps } from '../../Types/types';
import DatePicker from 'react-native-modern-datepicker';
import limitDate from '../../pages/utils/limitDate';

const initialFormEvent = {
  name: '',
  local: '',
  adress: '',
  date: '',
  time: '',
  price: '',
  description: '',
};

const RegistrationEvent = () => {
  const [formEvent, setFormEvent] = useState<EventProps>(initialFormEvent);
  const [validationErrors, setValidationErrors] = useState<EventProps>(initialFormEvent);
  const [date, setDate] = useState<string>(limitDate(new Date().toString()));
  const [showPicker, setShowPicker] = useState(false);
  
  const dispatch: ThunkDispatch<RootState, undefined, Action<any>> =
    useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required('O nome do evento é obrigatório'),
    local: yup.string().required('O local é obrigatório'),
    adress: yup.string().required('O endereço é obrigatório'),
    time: yup.string().required('O horário é obrigatório'),
    price: yup.string().required('O preço é obrigatório'),
    date: yup
      .string()
      .required('A data do evento é obrigatória')
      .test('data-futura', 'A data do evento deve ser futura', function (
        value
      ) {
        if (!value) return false;        

        const selectedDate = moment(value, 'DD/MM/YYYY');
        const currentDate = moment().startOf('day');

        return selectedDate.isSameOrAfter(currentDate);
      })
      .typeError('Formato de data inválido'),
  });

  const handlePost = async (data: EventsProps) => {
    await dispatch(AddApiEvent(data));
  };

  const handleRegistration = () => {
    schema
      .validate(formEvent, { abortEarly: false })
      .then(() => {        
        handlePost(formEvent as unknown as EventsProps);
        setValidationErrors(initialFormEvent);
        setFormEvent(initialFormEvent);
      })
      .catch((error) => {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((e: { path: string | number; message: string }) => {
          errors[String(e.path)] = e.message;
        });
        setValidationErrors(errors as unknown as EventProps);
      });
  };

  const onChange = (selectedDate: string) => {
    setShowPicker(false);
    setDate(selectedDate as string);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  
  const actualDate= limitDate(new Date().toString())

  useEffect(() => {
    if (formatarData(date) !== formatarData(actualDate)) {
      setFormEvent({ ...formEvent, date: formatarData(date) })
    }
  }, [date])  

  return (
    <S.Container>
      <S.Label>Nome do evento</S.Label>
      <S.Input
        value={formEvent.name}
        onChangeText={(text: string) =>
          setFormEvent({ ...formEvent, name: text })
        }
      />
      <S.AlertError>{validationErrors.name}</S.AlertError>
      <S.Label>Local do evento</S.Label>
      <S.Input
        value={formEvent.local}
        onChangeText={(text: string) =>
          setFormEvent({ ...formEvent, local: text })
        }
      />
      <S.AlertError>{validationErrors.local}</S.AlertError>
      <S.Label>Endereço</S.Label>
      <S.Input
        value={formEvent.adress}
        onChangeText={(text: string) =>
          setFormEvent({ ...formEvent, adress: text })
        }
      />
      <S.AlertError>{validationErrors.adress}</S.AlertError>
      <S.Label>Horário</S.Label>
      <S.Input
        value={formEvent.time}
        onChangeText={(text: string) =>
          setFormEvent({ ...formEvent, time: text })
        }
      />
      <S.AlertError>{validationErrors.time}</S.AlertError>
      <S.Label>Descrição sobre o evento</S.Label>
      <S.Input
        value={formEvent.description}
        onChangeText={(text: string) =>
          setFormEvent({ ...formEvent, description: text })
        }
      />
      <S.AlertError>{validationErrors.description}</S.AlertError>
      <S.Label>Valor do ticket em R$</S.Label>
      <S.InputPrice
        type="money"
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          suffixUnit: '',
        }}
        value={formEvent.price}
        onChangeText={(text: string) =>
          setFormEvent({ ...formEvent, price: text })
        }
        keyboardType="numeric"
      />
      <S.AlertError>{validationErrors.price}</S.AlertError>
      <Button onPress={showDateTimePicker} title="Selecionar Data/Hora" />
      {showPicker &&
        <DatePicker
          mode="calendar"
          minimumDate={actualDate}
          onSelectedChange={(text) => onChange(text)}
        />}
      {formEvent.date && <S.Label>{formEvent.date}</S.Label>}
      <S.AlertError>{validationErrors.date}</S.AlertError>
      <S.CustomButton onPress={handleRegistration}>
        <S.CustomButtonText>Iniciar venda</S.CustomButtonText>
      </S.CustomButton>
    </S.Container>
  );
};

export default RegistrationEvent;