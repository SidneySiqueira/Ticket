import React, { useEffect, useState } from 'react';
import * as S from './styled'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import RegistrationForm from '../../components/RegistrationForm';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchApi } from '../../redux/apiSlice';
import { setIsLoggerSlice } from '../../redux/isLoggerSlice';
import { UsersProps } from '../../Types/types';

const Login = () => {
    const { users } = useSelector((state: RootState) => state.api);    

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backLogin, setBackLogin] = useState(false);
    const [error, setError] = useState(false);

    const navigation= useNavigation<NavigationProp<Record<string, any>>>()

    const dispatch: ThunkDispatch<RootState, undefined, Action<any>> = useDispatch();

    useEffect(() => {
        dispatch(fetchApi())
    }, [backLogin]);

    const usersArray = users ? Object.values(users) : [];

    const handleLogin = () => {
        const foundUser = usersArray.find((user: UsersProps) => user.email === userEmail.replace(/\s/g, '') && user.password === password);
        if (foundUser) {
            setError(false)
            dispatch(setIsLoggerSlice(foundUser))
            navigation.navigate('Home')
        } else {
            setError(true)
        }
    };

    return (
        <ScrollView>
            <S.Container>
                {!backLogin ?
                    <>
                        <S.TicketImage source={require('../../../assets/public/images/Ticket.png')} />
                        <S.Input
                            placeholder={"Digite o email"}
                            onChangeText={(text: React.SetStateAction<string>) => setUserEmail(text)}
                            value={userEmail}
                            error={error}
                        />
                        <S.Input
                            placeholder="Digite a senha"
                            secureTextEntry
                            onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                            value={password}
                            error={error}
                        />
                        {error && <S.Alert>Email ou Senha inválidos</S.Alert>}
                        <S.CustomButton onPress={handleLogin}>
                            <S.CustomButtonText>Acessar</S.CustomButtonText>
                        </S.CustomButton>
                        <S.Register>
                            <S.TextRegister onPress={() => setBackLogin(true)}>Cadastrar</S.TextRegister>
                        </S.Register>
                    </> :
                    <>
                        <RegistrationForm setBackLogin={setBackLogin} />
                        <S.Register>
                            <S.TextRegister onPress={() => setBackLogin(false)}>Voltar ao login</S.TextRegister>
                        </S.Register>
                    </>}
            </S.Container>
        </ScrollView>

    );
};

export default Login;