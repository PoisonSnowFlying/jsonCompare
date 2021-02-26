import React from 'react';
import { render } from 'react-dom';
import {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
} from 'tapable'
class Test {
    constructor() {
        this.hooks = {
            syncHook: new SyncHook(['param1', 'param2']),
            syncBailHook: new SyncBailHook(['params1', 'param2']),
            syncWaterfallHook: new SyncWaterfallHook(['params1', 'param2']),

            asyncParallelHook: new AsyncParallelHook(['params1', 'param2']),

            asyncParallelBailHook: new AsyncParallelBailHook(['params1', 'param2']),

            asyncSeriesHook: new AsyncSeriesHook(['params1', 'param2']),

            asyncSeriesBailHook: new AsyncSeriesBailHook(['params1', 'param2']),

            asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(['params1', 'param2'])
        };
    }

    tap() {
        this.hooks.syncHook.tap('tap1', function (param1, param2) { console.log('tap1', param1, param2); });
        this.hooks.syncHook.tap('tap2', function (param1, param2) { console.log('tap2', param1, param2); });
        this.hooks.syncHook.tap('tap3', function (param1, param2) { console.log('tap3', param1, param2); });

        this.hooks.syncBailHook.tap('tap4', () => console.log(`刹车1`));
        this.hooks.syncBailHook.tap('tap5', () => { console.log(`刹车2`); return '在此处刹车' });
        this.hooks.syncBailHook.tap('tap6', () => console.log(`刹车3`));

        this.hooks.syncWaterfallHook.tap('tap7', (params1, param2) => { console.log(`初始值是${params1}`); return params1 + 1 });
        this.hooks.syncWaterfallHook.tap('tap8', (params1, param2) => { console.log(`中间值${params1}`); return params1 + 1 });
        this.hooks.syncWaterfallHook.tap('tap9', (params1, param2) => { console.log(`最终值${params1}`); return params1 + 1 });
        const asyncFunc = (step, isCallback = false) => {
            return (...args) => {
                setTimeout(() => {
                    console.log('测试代码回调' + step);
                    const callback = args[args.length - 1];
                    if (isCallback && typeof callback === 'function') {
                        callback();
                    }
                }, 2000)
            }
        }
        const asyncPromiseFunc = (step) => {
            return (...args) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log('测试代码回调' + step);
                        resolve();
                    },2000);
                })
            }
        }
        // this.hooks.asyncParallelHook.tapAsync('tap10', asyncFunc(1,true));
        // this.hooks.asyncParallelHook.tapAsync('tap11', asyncFunc(2,true));

        // this.hooks.asyncParallelBailHook.tapAsync('tap12', asyncFunc(1, true));
        // this.hooks.asyncParallelBailHook.tapAsync('tap13', asyncFunc(2, true));

        this.hooks.asyncSeriesHook.tapAsync('tap20', asyncFunc(1,true));
        this.hooks.asyncSeriesHook.tapAsync('tap31', asyncFunc(1,true));
        return this;
    }
    intercept() {
        this.hooks.syncHook.intercept({
            call:(...args) => {
                console.log(...args,'intercept call');
            },
            register:(...args)=> {
                console.log(...args,'register');
            },
            tap:(...args) => {
                console.log(...args,'tap');
            }
        });
        return this;
    }
    call() {
        // 更换对应的hook
        this.hooks.syncHook.call(1, 2);
        return this;
    }
}

const test = new Test();
test.intercept();
test.tap().call();
render(
    <div>222</div>,
    document.querySelector('#app'));

// syncHook
(function anonymous(param1, param2
) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(param1, param2);
    var _fn1 = _x[1];
    _fn1(param1, param2);
    var _fn2 = _x[2];
    _fn2(param1, param2);

})
    //syncBailHook
    (function anonymous(params1, param2
    ) {
        "use strict";
        var _context;
        var _x = this._x;
        var _fn0 = _x[0];
        var _result0 = _fn0(params1, param2);
        if (_result0 !== undefined) {
            return _result0;
            ;
        } else {
            var _fn1 = _x[1];
            var _result1 = _fn1(params1, param2);
            if (_result1 !== undefined) {
                return _result1;
                ;
            } else {
                var _fn2 = _x[2];
                var _result2 = _fn2(params1, param2);
                if (_result2 !== undefined) {
                    return _result2;
                    ;
                } else {
                }
            }
        }

    })
    //syncWaterfallHook
    (function anonymous(params1, param2
    ) {
        "use strict";
        var _context;
        var _x = this._x;
        var _fn0 = _x[0];
        var _result0 = _fn0(params1, param2);
        if (_result0 !== undefined) {
            params1 = _result0;
        }
        var _fn1 = _x[1];
        var _result1 = _fn1(params1, param2);
        if (_result1 !== undefined) {
            params1 = _result1;
        }
        var _fn2 = _x[2];
        var _result2 = _fn2(params1, param2);
        if (_result2 !== undefined) {
            params1 = _result2;
        }
        return params1;

    })
    /**************************************************异步 ***********************************************/
    //asyncParallellHook
    (function anonymous(params1, param2, _callback
    ) {
        "use strict";
        var _context;
        var _x = this._x;
        do {
            var _counter = 2;
            var _done = (function () {
                _callback();
            });
            if (_counter <= 0) break;
            var _fn0 = _x[0];
            _fn0(params1, param2, (function (_err0) {
                if (_err0) {
                    if (_counter > 0) {
                        _callback(_err0);
                        _counter = 0;
                    }
                } else {
                    if (--_counter === 0) _done();
                }
            }));
            if (_counter <= 0) break;
            var _fn1 = _x[1];
            _fn1(params1, param2, (function (_err1) {
                if (_err1) {
                    if (_counter > 0) {
                        _callback(_err1);
                        _counter = 0;
                    }
                } else {
                    if (--_counter === 0) _done();
                }
            }));
        } while (false);
    })
    //asyncParallelBailHook
    (function anonymous(params1, param2, _callback
    ) {
        "use strict";
        var _context;
        var _x = this._x;
        var _results = new Array(2);
        var _checkDone = function () {
            for (var i = 0; i < _results.length; i++) {
                var item = _results[i];
                if (item === undefined) return false;
                if (item.result !== undefined) {
                    _callback(null, item.result);
                    return true;
                }
                if (item.error) {
                    _callback(item.error);
                    return true;
                }
            }
            return false;
        }
        do {
            var _counter = 2;
            var _done = (function () {
                _callback();
            });
            if (_counter <= 0) break;
            var _fn0 = _x[0];
            _fn0(params1, param2, (function (_err0, _result0) {
                if (_err0) {
                    if (_counter > 0) {
                        if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                } else {
                    if (_counter > 0) {
                        if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
            }));
            if (_counter <= 0) break;
            if (1 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _fn1 = _x[1];
                _fn1(params1, param2, (function (_err1, _result1) {
                    if (_err1) {
                        if (_counter > 0) {
                            if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if (--_counter === 0) _done();
                            }
                        }
                    } else {
                        if (_counter > 0) {
                            if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if (--_counter === 0) _done();
                            }
                        }
                    }
                }));
            }
        } while (false);

    })
    //asyncSeriesHook，asyncSeriesBailHook，asyncWaterfallHook  tapPromise版本
    (function anonymous(params1, param2
    ) {
        "use strict";
        var _context;
        var _x = this._x;
        return new Promise((function (_resolve, _reject) {
            var _sync = true;
            function _error(_err) {
                if (_sync)
                    _resolve(Promise.resolve().then((function () { throw _err; })));
                else
                    _reject(_err);
            };
            function _next0() {
                var _fn1 = _x[1];
                var _hasResult1 = false;
                var _promise1 = _fn1(params1, param2);
                if (!_promise1 || !_promise1.then)
                    throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
                _promise1.then((function (_result1) {
                    _hasResult1 = true;
                    // 该分支就是熔断逻辑
                    if (_result1 !== undefined) {
                        _resolve(_result1);

                    } else {
                        _resolve();
                    }
                }), function (_err1) {
                    if (_hasResult1) throw _err1;
                    _error(_err1);
                });
            }
            var _fn0 = _x[0];
            var _hasResult0 = false;
            var _promise0 = _fn0(params1, param2);
            if (!_promise0 || !_promise0.then)
                throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
            _promise0.then((function (_result0) {
                _hasResult0 = true;
                //这是waterfall
                if (_result0 !== undefined) {
                    params1 = _result0;
                }
                _next0();

                // 这是bail
                if (_result0 !== undefined) {
                    _resolve(_result0);
                }
                else {
                    _next0();
                }
                // 这是普通hook
                _next0();
            }), function (_err0) {
                if (_hasResult0) throw _err0;
                _error(_err0);
            });
            _sync = false;
        }));

    })
    //asyncSeriesHook，asyncSeriesBailHook，asyncWaterfallHook  tapAsync版本
    (function anonymous(params1, param2, _callback
    ) {
        "use strict";
        var _context;
        var _x = this._x;
        function _next0() {
            var _fn1 = _x[1];
            _fn1(params1, param2, (function (_err1, _result1) {
                if (_err1) {
                    _callback(_err1);
                } else {
                    if (_result1 !== undefined) {
                        params1 = _result1;
                    }
                    _callback(null, params1);
                }
            }));
        }
        var _fn0 = _x[0];
        _fn0(params1, param2, (function (_err0, _result0) {
            // 这是watrfall
            if (_err0) {
                _callback(_err0);
            } else {
                if (_result0 !== undefined) {
                    params1 = _result0;
                }
                _next0();
            }
            // 这是bail
            if (_err0) {
                _callback(_err0);
            } else {
                if (_result0 !== undefined) {
                    _callback(null, _result0);

                } else {
                    _next0();
                }
            }
            // 这是普通的
            if (_err0) {
                _callback(_err0);
            } else {
                _next0();
            }
        }));

    })
