import React from 'react';
import { render } from 'react-dom';
import { SyncHook, SyncBailHook,SyncWaterfallHook } from 'tapable'
class Test {
    constructor() {
        this.hooks = {
            syncHook: new SyncHook(['param1', 'param2']),
            syncBailHook: new SyncBailHook(['params1', 'param2']),
            syncWaterfallHook:new SyncWaterfallHook(['params1', 'param2']),
        };
    }

    tap() {
        this.hooks.syncHook.tap('tap1', function (param1, param2) { console.log('tap1', param1, param2); });
        this.hooks.syncHook.tap('tap2', function (param1, param2) { console.log('tap2', param1, param2); });
        this.hooks.syncHook.tap('tap3', function (param1, param2) { console.log('tap3', param1, param2); });

        this.hooks.syncBailHook.tap('tap4', () => console.log(`刹车1`));
        this.hooks.syncBailHook.tap('tap5', () => {console.log(`刹车2`); return '在此处刹车'});
        this.hooks.syncBailHook.tap('tap6', () => console.log(`刹车3`));

        this.hooks.syncWaterfallHook.tap('tap7', (params1,param2) => {console.log(`初始值是${params1}`);return params1 + 1});
        this.hooks.syncWaterfallHook.tap('tap8', (params1,param2) => {console.log(`中间值${params1}`);return  params1 + 1});
        this.hooks.syncWaterfallHook.tap('tap9', (params1,param2) => {console.log(`最终值${params1}`);return  params1 + 1});





        return this;
    }

    call() {
        let res = this.hooks.syncWaterfallHook.call(1, 2);
        //console.log('res', res);
        return this;
    }
}

const test = new Test();
test.tap().call();


const ZJ = () => {
    return (<div>222</div>)
}
render(
    <ZJ />,
    document.querySelector('#app'));

// syncHook
// (function anonymous(param1, param2
//     ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     _fn0(param1, param2);
//     var _fn1 = _x[1];
//     _fn1(param1, param2);
//     var _fn2 = _x[2];
//     _fn2(param1, param2);

//     })


//syncBailHook
// (function anonymous(params1, param2
// ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     var _result0 = _fn0(params1, param2);
//     if (_result0 !== undefined) {
//         return _result0;
//         ;
//     } else {
//         var _fn1 = _x[1];
//         var _result1 = _fn1(params1, param2);
//         if (_result1 !== undefined) {
//             return _result1;
//             ;
//         } else {
//             var _fn2 = _x[2];
//             var _result2 = _fn2(params1, param2);
//             if (_result2 !== undefined) {
//                 return _result2;
//                 ;
//             } else {
//             }
//         }
//     }

// })


//syncWaterfallHook
// (function anonymous(params1, param2
//     ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     var _result0 = _fn0(params1, param2);
//     if(_result0 !== undefined) {
//     params1 = _result0;
//     }
//     var _fn1 = _x[1];
//     var _result1 = _fn1(params1, param2);
//     if(_result1 !== undefined) {
//     params1 = _result1;
//     }
//     var _fn2 = _x[2];
//     var _result2 = _fn2(params1, param2);
//     if(_result2 !== undefined) {
//     params1 = _result2;
//     }
//     return params1;
    
//     })