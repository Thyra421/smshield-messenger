"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.method = void 0;
var method;
(function (method) {
    method[method["get"] = 0] = "get";
    method[method["post"] = 1] = "post";
    method[method["patch"] = 2] = "patch";
    method[method["delete"] = 3] = "delete";
})(method = exports.method || (exports.method = {}));
function route(method, url) {
    return (target, memberName, propertyDescriptor) => {
        target.list.push("url");
    };
}
exports.route = route;
//# sourceMappingURL=types.js.map