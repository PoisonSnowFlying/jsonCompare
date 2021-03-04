import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import './index.scss';
export default ({
    num = 1,
    index = 0,
    click,
    btnGroupList=[]
}) => {

    return (
        <div className="button_group">
            {
                btnGroupList.map((item, i) => {
                    return <Button
                        key={`${item}${i}`}
                        onClick={(e) => click(e,i)}
                        type={i === index ? 'primary' : 'default'}
                        className="my_button"
                    >{item}</Button>
                })
            }
        </div>
    )
}