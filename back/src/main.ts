import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  var express = require("express");
  var cors = require("cors");

  const app = await NestFactory.create(AppModule);
  app.use(cors());

  app.setGlobalPrefix("api");
  await app.listen(AppModule.port);
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
