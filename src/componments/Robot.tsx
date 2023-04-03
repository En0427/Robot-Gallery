import React, { useContext } from "react";
import styles from './Robot.module.css'
import { appContext } from "../Appstate";
import { withAddToCart } from './AddToCart'

export interface RobotProps {
    id: number;
    name: string;
    email: string;
    addToCart: (id, name) => void;
}

const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
    const value = useContext(appContext);
    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>{name}</h2>
            <p>{email}</p>
            <p>Author: {value.username}</p>
            <button onClick={() => addToCart(id, name)}>Add to Cart</button>
        </div>);
};

export default withAddToCart(Robot);
