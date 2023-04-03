import React, { useState, useEffect } from 'react';
import logo from './assets/images/logo.svg';
// import robots from './mockdata/robots.json'
import Robot from './componments/Robot';
import RobotDiscount from './componments/RobotDiscount';
import styles from './App.module.css';
import ShoppingCart from './componments/ShoppingCart'

interface Props {}

// interface State {
//   robotGallery: any[];
//   count: number;
// }

const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")

  useEffect(() => { document.title = `click ${count} time` }, [count])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      // .then(response => response.json())
      // .then(data => setRobotGallery(data));
      setRobotGallery(data);}
      catch(e){
        setError(e.message)}
      setLoading(false)
    }
      fetchData();
  }, []);
  /*   //* 生命周期第一阶段：初始化
    //初始化组件state
    constructor(props) {
      super(props)
      this.state = {
        robotGallery: [],
        count: 0
      };
    }
    
    //在组件创建好dom元素以后、挂载进页面的时候调用
    componentDidMount(): void {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => this.setState({ robotGallery: data }));
    } */

  // * 生命周期第二阶段：更新
  // * 生命周期第三阶段：销毁
  // render() {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>Robert Robot Gallery Shopping Site</h1>
      </div>
      <button onClick={() => {
        setCount(count + 1)
        /*  this.setState({ count: this.state.count + 1 }, () => {
           console.log("count", this.state.count)
         }); */
      }}>Click</button>
      <span>count: {count}</span>
      <ShoppingCart />
      {(error !== "") ?<div>webiside error:{error}</div>:""}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) => 
            index % 2 === 0 ? (<RobotDiscount id={r.id} email={r.email} name={r.name} />) :
            (<Robot id={r.id} email={r.email} name={r.name} />))}
        </div>)
        : (<h2>loading</h2>) 
      }
    </div>
  );
}
//}

export default App;
