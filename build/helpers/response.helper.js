"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static success(data) { return { "data": data }; }
    static error(error) { return { "error": error }; }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map