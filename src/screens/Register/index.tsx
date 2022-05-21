import React,{useState} from "react";
import {Modal} from 'react-native'
import {useForm} from 'react-hook-form'

import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";

import { 
    Container,
    Header,
    Title,
    Form,
    Filds,
    TransactionsTypes,
} from "./styles";

interface FormData{
    name: string;
    amount: string;
}

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,

    } = useForm();

    function handleTransactionsTypes(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleOpenSelectlectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData){
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)
    }

    return(
        <Container>
            <Header>
                <Title>Cadastrar</Title>
            </Header>

            <Form>
                <Filds>
                    <InputForm
                        control={control}
                        name="name"
                        placeholder="Nome"
                    />
                    <InputForm
                        control={control}
                        name="amount"
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
                    onPress={handleSubmit(handleRegister)}
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