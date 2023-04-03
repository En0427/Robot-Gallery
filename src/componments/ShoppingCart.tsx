import React from "react";
import styles from "./ShoppingCart.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { appContext } from "../Appstate";

interface Props {

}

interface State {
    isOpen: boolean
}
//props是组件对外的借口，state是组件对内的接口
//props用于组件间数据传递，而state用于组件内部的数据传递
//直接修改state，组件不会触发render函数，页面不会渲染，正确修改方式是使用setState()

class ShoppingCart extends React.Component<Props, State> {
    constructor(props: Props) { //组件构建函数，参数类型props接口
        super(props); //super关键词调用React.Component基础类的构建函数，同时把Component的porps参数传递给super
        this.state = { //初始化组件状态，通过this关键词访问state
            isOpen: false, //购物车下拉菜单隐藏起来，初始化为false
        };
        //this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("e.target", e.target)
        console.log("e.currentTarget", e.currentTarget)
        if ((e.target as HTMLElement).nodeName === "SPAN") {
            this.setState({ isOpen: !this.state.isOpen });
        }
    }

    render() { //渲染html
        return (
            <appContext.Consumer>{(value) => {
                return <div className={styles.cartContainer}>
                    <button
                        className={styles.button}
                        onClick={this.handleClick}
                        //添加点击事件，用户点击时，可以改变组件显示状态
                    >
                        <FiShoppingCart />
                        <span>ShoppingCart {value.shoppingCart.items.length} (piece)</span>
                    </button>
                    <div className={styles.cartDropDown}
                        style={{display: this.state.isOpen ? "block" : "none"}} 
                        //下拉菜单隐藏，in-line-style样式 //下拉菜单元素
                    >
                        <ul>{value.shoppingCart.items.map((i) => (<li>{i.name}</li>))}</ul>
                    </div>
                </div>
            }}</appContext.Consumer>
        );
    }
}

export default ShoppingCart; //导出html文件