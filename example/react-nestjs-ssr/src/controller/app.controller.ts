import { Controller, Get, Res, UseInterceptors } from "@nestjs/common";

import { App } from "../app";
import { ReactComponentInterceptor, Component } from "@react-ssr-frame/core";

@Controller()
@UseInterceptors(ReactComponentInterceptor)
export class AppController {
  @Get("/home")
  @Component(App)
  findAll(@Res() res: any) {
     
    return null;
  }
}
