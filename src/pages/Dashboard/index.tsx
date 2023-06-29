import React from 'react';
import * as S from './styled'
import Cards from '../../components/Cards';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MyEvents = () => {
    const { user } = useSelector((state: RootState) => state.isLogger);

    return (
        <ScrollView>
            {user.events ?
                (
                    <S.Container>
                        {user.events.map((event, index: number) => (
                            <Cards key={`${event.name}${index}`} event={event} />
                        ))}
                    </S.Container>
                ) : (
                    <S.Title>Você não tem eventos adicionados</S.Title>
                )}
        </ScrollView>
    );
};
export default MyEvents;