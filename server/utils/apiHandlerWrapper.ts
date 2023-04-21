import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type AllowedMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const apiHandlerWrapper =
  (
    handlers: Partial<
      Record<
        AllowedMethods,
        { handler: NextApiHandler; schema?: z.ZodObject<{}> }
      >
    >
  ) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    const requestMethod = req.method as AllowedMethods;
    const allowedMethods = Object.keys(handlers) as AllowedMethods[];
    const isRequestMethodAllowed =
      requestMethod && allowedMethods.includes(requestMethod);

    if (!isRequestMethodAllowed) {
      res.status(405).end(`Method ${requestMethod} Not Allowed`);
      return;
    }

    let body;
    let validation;
    switch (requestMethod) {
      case "POST":
        body = parseBody(req);
        console.log(body);
        validation = handlers.POST!.schema?.safeParse(body);
        if (validation && !validation.success) {
          res.status(400).send({ message: validation.error.toString() });
        }

        handlers.POST!.handler({...req, body} as NextApiRequest, res);
        return;

      case "GET":
        const queryStringParams = req.query;

        validation = handlers.GET!.schema?.safeParse(queryStringParams);
        if (validation && !validation.success) {
          res.status(400).send({ message: validation.error.toString() });
        }

        handlers.GET!.handler(req, res);
        break;

      case "PUT":
        body = parseBody(req);
        validation = handlers.PUT!.schema?.safeParse(body);
        if (validation && !validation.success) {
          res.status(400).send({ message: validation.error.toString() });
        }

        handlers.PUT!.handler({...req, body} as NextApiRequest, res);
        break;
      case "DELETE":
        handlers.DELETE!.handler(req, res);
        break;

      case "PATCH":
        body = parseBody(req);
        validation = handlers.PATCH!.schema?.safeParse(body);
        if (validation && !validation.success) {
          res.status(400).send({ message: validation.error.toString() });
        }

        handlers.PATCH!.handler({...req, body} as NextApiRequest, res);
        break;

      default:
        const missingMethod: never = requestMethod;
        res.status(405).end(`Method ${missingMethod} Not Allowed`);
    }
  };

const parseBody = (req: NextApiRequest) => {
  return typeof req.body === "object" ? req.body : JSON.parse(req.body);
};
