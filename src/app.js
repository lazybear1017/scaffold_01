import React from 'react'
import { Button } from 'antd';
import Default from './pages/Default'
import './app.less'

export default class App extends React.Component{
    componentDidMount(){
        console.log('熊程峰')
    }
    render(){
        return <>
            <h1 className='myapp'>App</h1>
            <Button type='primary'>按钮</Button>
            <Default />
        </>
    }
}