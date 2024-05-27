import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { ReactComponentInterceptor } from "@react-ssr-frame/core";

@Module({
  controllers: [AppController],
  providers: [ReactComponentInterceptor],
})
export class AppModule {}
