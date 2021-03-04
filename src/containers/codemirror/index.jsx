import React,{useRef}from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/merge/merge.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import './index.scss';
export default ({
    origin,
    target,
    type
}) => {
    const code = useRef(null);
    let value,orig;
    if(type !== 'juststring') {
        value = typeof origin === 'string' ? JSON.stringify(JSON.parse(target),null,'\t') : JSON.stringify(target,null,'\t');
        orig = typeof origin === 'string' ? JSON.stringify(JSON.parse(origin),null,'\t') : JSON.stringify(origin,null,'\t');
    } else {
        value = target;
        orig = origin;
    }
    React.useEffect(() => {
            if (value == null) return;
            if(code.current) {
                code.current.innerHTML = '';
            }
            const cr = CodeMirror.MergeView(code.current, {
                value,
                //origLeft: panes == 2 ? orig1 : null,
                revertButtons:false,
                orig,
                lineNumbers: true,
                mode: "text/html",
                highlightDifferences: true,
                connect: 'align',
                collapseIdentical: false,
            });
            cr.edit.refresh();
            // 不可编辑
            cr.editor().options.readOnly = true;
    }, [type]);
    return (
        <div className="codemirror_container">
            <div className="codemirror" ref={code}>
            </div>
        </div>
    )
}




