import './index.scss';
import React from 'react';
import {Button, Card, Form, Input} from 'reactstrap';
import {useAppDispatch} from "../../hooks";
import {setCurrentPage, setLoading, setNickname} from "../../store/application.store";
import {CONTROLS} from "../../controls";
import {Page} from "../../config/constants";
import {launchGame} from "../../phaser-game";

export const Login = () => {
    const dispatch = useAppDispatch()

    const onStart = (evt) => {
        evt.preventDefault()
        const data = new FormData(evt.target)
        if(!data.get("name")) {
            alert("Name is required")
            return;
        }
        CONTROLS.setProgress(50)
        dispatch(setLoading(true))
        dispatch(setNickname(data.get("name").toString()))
        setTimeout(() => {
            dispatch(setLoading(false))
            dispatch(setCurrentPage(Page.GAME))
            launchGame()
        }, 3000)
    };
    return (
        <div className="center-extended">
            <div className="fade-in">
                <Card className="game-form">
                    <Form onSubmit={onStart} initialValues={{name: "name"}}>
                        <Input type="text" placeholder="Input your name" name='name'/>

                        <Button type="submit" color="success">Start game!</Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
