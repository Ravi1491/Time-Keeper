import { NextFunction, Request, Response } from "express";

export function serverMiddleware(req : Request, res : Response, next : NextFunction){
  let protocol = req.protocol;
  let host = req.get('host');
  let url = req.originalUrl;
  let method = req.method;
  let date = new Date();
 
  console.log(protocol + "://" + host + url + "  " + method + "  " + date)

  next();
}
