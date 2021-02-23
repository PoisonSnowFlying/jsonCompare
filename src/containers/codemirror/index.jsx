import React,{useRef}from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/merge/merge.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import sq from './sq.json';
import sq2 from './sq2.json';
import './index.scss';
export default () => {
    const value = 1;
    const code = useRef(null);
    React.useEffect(() => {
        function initUI() {
            if (value == null) return;
            const cr = CodeMirror.MergeView(code.current, {
                value: JSON.stringify(sq,null,'\t'),
                //origLeft: panes == 2 ? orig1 : null,
                revertButtons:false,
                orig: JSON.stringify(sq2,null,'\t'),
                lineNumbers: true,
                mode: "text/html",
                highlightDifferences: true,
                connect: 'align',
                collapseIdentical: false,
            });
            // 不可编辑
            cr.editor().options.readOnly = true
        }
        initUI();
    }, []);
    return (
        <div className="codemirror_container">
            <div className="codemirror" ref={code}>
            </div>
        </div>
    )
}




