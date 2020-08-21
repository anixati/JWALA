import { registry, container } from "tsyringe";
import { MediaRoute } from "./MediaRoute";
import { SystemRoute } from "./SystemRoute";
import { RouterBase } from "../lib";

export const handlerTkn = "router"; 
@registry([ 
  { token: handlerTkn, useToken: MediaRoute }, // can be any provider
  { token: handlerTkn, useToken: SystemRoute },
])
class Router{
    getRoutes(){
      return container.resolveAll<RouterBase>(handlerTkn);
    }
}

export const router = new Router();