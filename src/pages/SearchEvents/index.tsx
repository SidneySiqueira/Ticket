import React, { SetStateAction, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useIsFocused } from '@react-navigation/native';

import * as S from './styled';
import CardSearchEvent from '../../components/CardSearchEvent';
import { RootState } from '../../redux/store';
import { fetchApiEvent } from '../../redux/apiEventsSlice';
import { EventProps } from '../../Types/types';

const SearchEvents = () => {
    const [typing, setTyping] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState<SetStateAction<EventProps[]>>([]);
    const { events } = useSelector((state: RootState) => state.events);
    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();
    const isFocused = useIsFocused();
    const eventsArray = events ? Object.values(events) : [];

    useEffect(() => {
        dispatch(fetchApiEvent());
    }, [isFocused]);

    useEffect(() => {
        setLoading(true)
        if (isFocused) {
            setFilteredEvents(eventsArray as unknown as EventProps[]);
            setLoading(false)
        }
    }, [events, isFocused]);

    const handleSearch = () => {
        const filteredEvents = eventsArray.filter((event) => (event as unknown as EventProps).name.includes(typing));
        setFilteredEvents(filteredEvents as unknown as EventProps[]);
    };

    return (
        <ScrollView>
            {loading ? <Text>Carregando...</Text> : 
            <>
                <S.Container>
                    <S.BoxSearch
                        placeholder="Digite o nome do evento"
                        onChangeText={setTyping}
                        value={typing}
                        onSubmitEditing={handleSearch}
                    />
                </S.Container>
                {filteredEvents.length > 0 ? (
                    <S.ContainerBody>
                        {(filteredEvents as EventProps[]).map((event: EventProps, index: number) => (
                            <CardSearchEvent key={index} event={event} />
                        ))}
                    </S.ContainerBody>
                ) : (
                    <S.Title>Não existem eventos para adquirir</S.Title>
                )}
            </>}
        </ScrollView>
    );
};

export default SearchEvents;