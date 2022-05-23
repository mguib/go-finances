import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useFocusEffect} from '@react-navigation/native'

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";


import {
    Container,
    Header,
    UserInfo,
    UserWrapper,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        // setData(transactions);
        const transactionsFormated: DataListProps[] = transactions.
            map((item: DataListProps) =>{
                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: '2-digit',
                }).format(new Date(item.date));

                return{
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }           
        });

        setData(transactionsFormated);
        console.log(transactionsFormated)
    }

    useEffect(()=> {
        loadTransactions();
        // const dataKey = '@gofinances:transactions';
        // AsyncStorage.removeItem(dataKey);
    },[])

    useFocusEffect(React.useCallback(() => {
        loadTransactions();
    },[]));
    // const data: DataListProps[] = [
    //     {
    //         id: '1',
    //         type: 'positive',
    //         title: "Desenvolvimento de site",
    //         amount: "R$ 12.000,00",
    //         category: {
    //             name: 'vendas',
    //             icon: 'dollar-sign',
    //         },
    //         date: '13/04/2020',
    //     },
    //     {
    //         id: '2',
    //         type: 'negative',
    //         title: "Desenvolvimento de site",
    //         amount: "R$ 12.000,00",
    //         category: {
    //             name: 'Alimentação',
    //             icon: 'coffee',
    //         },
    //         date: '13/04/2020',
    //     },
    //     {
    //         id: '3',
    //         type: 'positive',
    //         title: "Desenvolvimento de site",
    //         amount: "R$ 12.000,00",
    //         category: {
    //             name: 'Aluguel do apartamento',
    //             icon: 'shopping-bag',
    //         },
    //         date: '13/04/2020',
    //     },
    // ]

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/43528733?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Guibson</UserName>
                        </User>
                    </UserInfo>

                    <LogoutButton onPress={ () => {console.log("Testando")}}>
                        <Icon name="power" />
                    </LogoutButton>
                    
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="01 à 16 de abril"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <TransactionCard data={item} />}

                />


            </Transactions>

        </Container>
    )
}

