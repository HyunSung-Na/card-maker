import {React, useEffect, useState} from 'react';
import styles from './maker.module.css';
import Header from "../header/header";
import Footer from "../footer/footer";
import {useHistory} from "react-router";
import Editor from "../editor/editor";
import Preview from "../preview/preview";

const Maker = ({authService}) => {
    const [cards, setCards] = useState([{
        id: '1',
        name: 'Ellie',
        company: 'SamSung',
        theme: 'dark',
        title: 'Software Engineer',
        email: 'ellie@gmail.com',
        message: 'go for it',
        fileName: 'ellie',
        fileUrl: null
    },
        {
            id: '2',
            name: 'hyun',
            company: 'SamSung',
            theme: 'light',
            title: 'Software Engineer',
            email: 'ellie@gmail.com',
            message: 'go for it',
            fileName: 'ellie',
            fileUrl: null
        },
        {
            id: '3',
            name: 'sung',
            company: 'SamSung',
            theme: 'colorful',
            title: 'Software Engineer',
            email: 'ellie@gmail.com',
            message: 'go for it',
            fileName: 'ellie',
            fileUrl: null
        }
    ]);
    const history = useHistory();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange(user => {
            if (!user) {
                history.push('/');
            }
        });
    });

    const addCard = card => {
        const updated = [...cards, card];
        setCards(updated);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor cards={cards} addCard={addCard}/>
                <Preview cards={cards}/>
            </div>
            <Footer />
        </section>
    )
};

export default Maker;