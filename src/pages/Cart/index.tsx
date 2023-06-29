import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

import * as S from './styled';
import { RootState } from '../../redux/store';
import sumPrices from '../utils/sumCurrencyValues';
import {
  clearCartSlice,
  removeFromCartSlice,
} from '../../redux/eventsCart';
import { fetchApi, updateApi } from '../../redux/apiSlice';
import { setIsLoggerSlice } from '../../redux/isLoggerSlice';

const Cart = () => {
  const [openMessage, setOpenMessage] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [nameEvent, setNameEvent] = useState('');
  const [isFetchComplete, setIsFetchComplete] = useState(false);

  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.isLogger);
  const { users } = useSelector((state: RootState) => state.api);  

  const dispatch: ThunkDispatch<RootState, undefined, Action<any>> =
    useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchApi());
      setIsFetchComplete(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (nameEvent !== '' && confirmRemove) {
      dispatch(removeFromCartSlice(nameEvent));
    }
    setConfirmRemove(false);
    setOpenMessage(false);
  }, [confirmRemove]);

  const handleRemove = (name: string) => {
    setOpenMessage(true);
    setNameEvent(name);
  };

  const handleBuyEvents = () => {
    if (!isFetchComplete) {
      return;
    }

    const updatedUser = { ...user };
    updatedUser.events = updatedUser.events || [];
    updatedUser.events = updatedUser.events.concat(cart);
    dispatch(setIsLoggerSlice(updatedUser));

    const usersArray = users ? Object.entries(users) : [];

    const existingUser = usersArray.find(([_, item]) => {
      const { email } = item;
      return email === user.email;
    });

    if (existingUser) {
      dispatch(updateApi({ item: existingUser[0], patchData: updatedUser }));
      dispatch(clearCartSlice());
    }
  };

  return (
    <ScrollView>
      {cart.length > 0 ? (
        <S.Container>
          {cart.map((event, index: number) => (
            <S.BoxEvents key={index}>
              <S.Title onPress={() => handleRemove(event.name)}>
                {event.name.length > 20
                  ? event.name.slice(0, 20) + '...'
                  : event.name}
              </S.Title>
              <S.Price onPress={() => handleRemove(event.name)}>
                {event.price}
              </S.Price>
            </S.BoxEvents>
          ))}
          <S.BoxTotal>
            <S.Title>Total</S.Title>
            <S.Price>{sumPrices(cart)}</S.Price>
          </S.BoxTotal>
          <S.CustomButton>
            <S.CustomButtonText onPress={handleBuyEvents}>
              Efetuar compra
            </S.CustomButtonText>
          </S.CustomButton>
        </S.Container>
      ) : (
        <S.Container>
          <S.Empty>Vazio</S.Empty>
        </S.Container>
      )}
      {openMessage ? (
        <S.Container>
          <S.Title>Deseja excluir esse evento?</S.Title>
          <View>
            <S.RemoveButton onPress={() => setConfirmRemove(true)}>
              Sim
            </S.RemoveButton>
            <S.RemoveButton onPress={() => setOpenMessage(false)}>
              Não
            </S.RemoveButton>
          </View>
        </S.Container>
      ) : (
        <S.Container>
          {cart.length > 0 && <S.Title>Para excluir, clique no item</S.Title>}
        </S.Container>
      )}
    </ScrollView>
  );
};

export default Cart;
