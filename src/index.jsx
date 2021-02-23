import React from 'react';
import { render } from 'react-dom';
import CodeMirror from './containers/codemirror';
render(
<div>
    <div>这是一个按钮</div>
    <CodeMirror/>
    
</div>,
document.querySelector('#app'));