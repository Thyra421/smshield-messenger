export class ResponseHelper {
    static success(data) { return { "data": data } }

    static error(error) { return { "error": error } }
}