import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { setCartSlice } from '../../redux/eventsCart';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import * as S from './styled';
import { EventProps } from '../../Types/types';

interface CardSearchEvent {
  event: EventProps
}

const CardSearchEvent = ({ event }: CardSearchEvent) => {
  const { user } = useSelector((state: RootState) => state.isLogger);
  const navigation = useNavigation<NavigationProp<Record<string, any>>>();

  const dispatch: ThunkDispatch<RootState, undefined, Action<any>> =
    useDispatch();

  const handleMoveToCart = () => {
    dispatch(setCartSlice(event));
    navigation.navigate('Carrinho');
  };

  const buyEvent = () => {
    const filterEvent = user.events && user.events.some(
      (item) => item.name === event.name
    );
    return filterEvent;
  };

  return (
    <S.Container>
      <S.TicketImage source={require('../../../assets/public/images/Ticket.png')} />
      <S.Title>{event.name}</S.Title>
      <S.Local>{event.local}</S.Local>
      <S.Adress>{event.adress}</S.Adress>
      <S.Title>Data</S.Title>
      <S.Infotext>{event.date}</S.Infotext>
      <S.Title>Horário</S.Title>
      <S.Infotext>{event.time}</S.Infotext>
      <S.Title>Valor</S.Title>
      <S.Infotext>{event.price}</S.Infotext>
      <S.Description>{event.description}</S.Description>
      <S.CustomButton purchasedEvent={buyEvent()} disabled={buyEvent()} onPress={handleMoveToCart}>
        <S.CustomButtonText>
          {buyEvent() ? 'Evento Comprado' : 'Adicionar no Carrinho'}
        </S.CustomButtonText>
      </S.CustomButton>
    </S.Container>
  );
};

export default CardSearchEvent;
