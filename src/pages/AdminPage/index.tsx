import React from 'react';
import * as S from './styled'
import { ScrollView } from 'react-native';
import RegistrationEvent from '../../components/RegistrationEvent';

const AdminPage = () => {

    return (
        <ScrollView>
            <S.Container>
              <RegistrationEvent/>
            </S.Container>
        </ScrollView>
    );
};
export default AdminPage;