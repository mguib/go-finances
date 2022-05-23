import React, { useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import {useTheme} from 'styled-components'

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
    LogoutButton,
    LoadContainer
} from './styles';
import { LastTransaction } from "../../components/HighlightCard/styles";
import { date } from "yup";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    function getLastTransactionDate(
        collection: DataListProps[], 
        type: 'positive' | 'negative'
        ){
        const lastTransactions = new Date(
        Math.max.apply(Math, collection            
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())))
            
        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR',{month:'long'})}`;
    }

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        // setData(transactions);
        const transactionsFormated: DataListProps[] = transactions.
            map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

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

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
            });

        setTransactions(transactionsFormated);

        const lastTransactionEntries =  getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensive =  getLastTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionExpensive}`;

        

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionExpensive}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval,
            }

        });

        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
        // const dataKey = '@gofinances:transactions';
        // AsyncStorage.removeItem(dataKey);
    }, [])

    useFocusEffect(React.useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator 
                            size="large"
                            color={theme.colors.primary} />
                    </LoadContainer>
                    :
                    <>

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

                                <LogoutButton onPress={() => { console.log("Testando") }}>
                                    <Icon name="power" />
                                </LogoutButton>

                            </UserWrapper>
                        </Header>

                        <HighlightCards>
                            <HighlightCard
                                type="up"
                                title="Entradas"
                                amount={highlightData.entries.amount}
                                lastTransaction={highlightData.entries.lastTransaction}
                            />
                            <HighlightCard
                                type="down"
                                title="Saídas"
                                amount={highlightData.expensives.amount}
                                lastTransaction={highlightData.expensives.lastTransaction}
                            />
                            <HighlightCard
                                type="total"
                                title="Total"
                                amount={highlightData.total.amount}
                                lastTransaction={highlightData.total.lastTransaction}
                            />
                        </HighlightCards>

                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionsList
                                data={transactions}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => <TransactionCard data={item} />}

                            />


                        </Transactions>
                    </>
            }

        </Container>
    )
}

