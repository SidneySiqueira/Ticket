import React from 'react';
import * as S from './styled'
import { EventProps } from '../../Types/types';

interface Cards {
    event:EventProps
}

const Cards = ({event}: Cards) => {

    return (
        <S.Container>
            <S.TicketImage source={require('../../../assets/public/images/Ticket.png')} />
            <S.Title>{event.name}</S.Title>
            <S.Title>{event.local}</S.Title>
            <S.Title><S.BoldText>Horário:</S.BoldText> {event.time}</S.Title>
            <S.Title><S.BoldText>Data:</S.BoldText> {event.date}</S.Title>
        </S.Container>
    );
};

export default Cards;