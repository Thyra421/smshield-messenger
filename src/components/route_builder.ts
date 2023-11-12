import { Request, Response } from "express";

// export type routeHandler = (req: Request, res: Response) => void
export type middleware = (req: Request, res: Response, next) => void

// export enum routeMethod {
//     get, post, patch, delete
// }

// export function route(method: routeMethod, url: string) {
//     return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
//         switch (method) {
//             case routeMethod.get:
//                 target.router.get(url, target[memberName])
//                 break
//             case routeMethod.post:
//                 target.router.post(url, target[memberName])
//                 break
//             case routeMethod.patch:
//                 target.router.post(url, target[memberName])
//                 break
//             case routeMethod.delete:
//                 target.router.post(url, target[memberName])
//                 break
//         }
//         console.log(`[${method.toString()}] ${url}`);
//     }
// }