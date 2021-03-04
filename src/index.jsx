import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import CodeMirror from './containers/codemirror';
import ButtonGroup from './containers/ButtonGroup'
import { TEMPLATE_DATA,btnGroupList} from './constants';
const { code, msg, data } = TEMPLATE_DATA;
const App = () => {
    const [index, setIndex] = useState(0);
    const [jsonData,setJsonData] = useState({origin:data.resBodyOnline,target:data.resBodySandbox});
    useEffect(()=> {
        console.log(index);
        if(index ===0 && data.resBodyOnline && data.resBodySandbox) {
            setJsonData({origin:data.resBodyOnline,target:data.resBodySandbox});
        } else if(index === 1 && data.resHeaderOnline && data.resHeaderSandbox){
            setJsonData({origin:data.resHeaderOnline,target:data.resHeaderSandbox,type:'juststring'})
        }
    },[index]);
    return (
        <div>
            <ButtonGroup 
            click={(e,i)=> {setIndex(i)}} 
            index={index}
             btnGroupList={btnGroupList}></ButtonGroup>
            <CodeMirror origin={jsonData.origin} target={jsonData.target} type={jsonData.type}/>
        </div>
    )
}
render(<App />,document.querySelector('#app'));