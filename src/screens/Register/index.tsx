import React,{useState} from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../../components/Forms/CategorySelect";

import { 
    Container,
    Header,
    Title,
    Form,
    Filds,
    TransactionsTypes,
} from "./styles";

export function Register(){
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionsTypes(type: 'up' | 'down'){
        setTransactionType(type);
    }

    return(
        <Container>
            <Header>
                <Title>Cadastrar</Title>
            </Header>

            <Form>
                <Filds>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionsTypes('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Outcome"
                            onPress={() =>handleTransactionsTypes('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsTypes>

                    <CategorySelect
                        title="Categoria"
                    />
                </Filds>               

                <Button
                    title="Enviar"
                />
            </Form>


        </Container>
    )
}