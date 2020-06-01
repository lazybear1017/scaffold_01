import React from 'react'
import { Button } from 'antd';
import Default from './pages/Default'
import './app.less'
import img from '../public/assets/images/img.png'

export default class App extends React.Component{
    componentDidMount(){
        console.log('熊程峰')
    }
    render(){
        return <>
            <h1 className='myapp'>App</h1>
            <Button type='primary'>按钮</Button>
            <Default />
            <img src={img} alt=""/>
            <div className='img-box'></div>
        </>
    }
}