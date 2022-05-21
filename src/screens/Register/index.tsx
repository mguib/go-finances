import React,{useState} from "react";
import {Modal} from 'react-native'

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

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
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    function handleTransactionsTypes(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectlectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
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

                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectlectCategoryModal}
                    />
                </Filds>               

                <Button
                    title="Enviar"
                />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>


        </Container>
    )
}