var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express8 from "express";
import cors from "cors";

// src/modules/auth/auth.routes.ts
import { Router } from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.6.0",
  "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Cart {\n  id         String     @id @default(uuid())\n  customerId String     @unique\n  customer   User       @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  items      CartItem[]\n  createdAt  DateTime   @default(now())\n  updatedAt  DateTime   @updatedAt\n\n  @@index([customerId])\n  @@map("cart")\n}\n\nmodel CartItem {\n  id     String @id @default(uuid())\n  cartId String\n  cart   Cart   @relation(fields: [cartId], references: [id], onDelete: Cascade)\n\n  mealId String\n  meal   Meals  @relation(fields: [mealId], references: [id], onDelete: Cascade)\n\n  quantity Int @default(1)\n\n  @@unique([cartId, mealId])\n  @@map("cart_item")\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String   @unique\n  slug        String?  @unique\n  description String?\n  logo        String\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  //* relations\n  meals      Meals[]\n  orderItems OrderItem[]\n\n  @@index([name])\n  @@map("mealCatagories")\n}\n\nmodel Meals {\n  id                  String   @id @default(uuid())\n  title               String\n  description         String?\n  price               Int\n  imageURL            String\n  isAvailable         Boolean  @default(true)\n  dietary_preferences String[]\n  createdAt           DateTime @default(now())\n  updatedAt           DateTime @updatedAt\n\n  providerId String\n  provider   ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n\n  reviews    Reviews[]\n  orderItems OrderItem[]\n  cartItems  CartItem[]\n\n  @@index([providerId])\n  @@index([categoryId])\n  @@map("meals")\n}\n\nmodel Order {\n  id              String        @id @default(uuid())\n  customerId      String\n  providerId      String\n  status          OrderSatus    @default(PLACED)\n  deliveryAddress String\n  paymentMethod   PaymentMethod @default(COD)\n  deliveryCharge  Int           @default(70)\n  totalAmount     Int\n  placedAt        DateTime      @default(now())\n  cancelledAt     DateTime?\n  deliveredAt     DateTime?\n  createdAt       DateTime      @default(now())\n  updatedAt       DateTime      @updatedAt\n\n  customer User            @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  provider ProviderProfile @relation(fields: [providerId], references: [id], onDelete: Cascade)\n\n  orderItems OrderItem[]\n}\n\nenum OrderSatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentMethod {\n  COD\n}\n\nmodel OrderItem {\n  id String @id @default(uuid())\n\n  orderId    String\n  mealId     String\n  categoryId String\n\n  order    Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  meal     Meals    @relation(fields: [mealId], references: [id])\n  category Category @relation(fields: [categoryId], references: [id])\n\n  quantity  Int\n  unitPrice Int\n  reviews   Reviews[]\n\n  @@index([orderId])\n  @@index([mealId])\n}\n\nmodel ProviderProfile {\n  id     String @id @default(uuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  businessName     String\n  businessSubtitle String   @db.VarChar(100)\n  businessPhone    String?\n  businessAdress   String?\n  description      String?\n  city             String?\n  businessLogo     String\n  isOpen           Boolean  @default(true)\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  //* relations\n  meals  Meals[]\n  orders Order[]\n\n  @@index([userId])\n  @@map("providers")\n}\n\nmodel Reviews {\n  id          String   @id @default(uuid())\n  customerId  String\n  mealId      String\n  orderItemId String\n  rating      Float\n  comment     String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  customer  User      @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  meal      Meals     @relation(fields: [mealId], references: [id], onDelete: Cascade)\n  orderItem OrderItem @relation(fields: [orderItemId], references: [id], onDelete: Cascade)\n\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  name      String\n  email     String   @unique\n  password  String\n  role      Role     @default(CUSTOMER)\n  status    Status   @default(ACTIVE)\n  phone     String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  //* relations\n  providerProfiles ProviderProfile?\n  orders           Order[]\n  reviews          Reviews[]\n  cart             Cart?\n\n  @@index([email])\n  @@map("user")\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum Status {\n  ACTIVE\n  SUSPENDED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"cart"},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meals","relationName":"CartItemToMeals"},{"name":"quantity","kind":"scalar","type":"Int"}],"dbName":"cart_item"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meals","relationName":"CategoryToMeals"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"CategoryToOrderItem"}],"dbName":"mealCatagories"},"Meals":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"imageURL","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"dietary_preferences","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealsToProviderProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeals"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"MealsToReviews"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealsToOrderItem"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeals"}],"dbName":"meals"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderSatus"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"deliveryCharge","kind":"scalar","type":"Int"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"placedAt","kind":"scalar","type":"DateTime"},{"name":"cancelledAt","kind":"scalar","type":"DateTime"},{"name":"deliveredAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meals","relationName":"MealsToOrderItem"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"unitPrice","kind":"scalar","type":"Int"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"OrderItemToReviews"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"businessName","kind":"scalar","type":"String"},{"name":"businessSubtitle","kind":"scalar","type":"String"},{"name":"businessPhone","kind":"scalar","type":"String"},{"name":"businessAdress","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"businessLogo","kind":"scalar","type":"String"},{"name":"isOpen","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meals","relationName":"MealsToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":"providers"},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"orderItemId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewsToUser"},{"name":"meal","kind":"object","type":"Meals","relationName":"MealsToReviews"},{"name":"orderItem","kind":"object","type":"OrderItem","relationName":"OrderItemToReviews"}],"dbName":"reviews"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerProfiles","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"user"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","orderBy","cursor","provider","meals","customer","orderItems","_count","order","meal","category","orderItem","reviews","cart","cartItems","orders","providerProfiles","items","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","data","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","create","update","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","having","_min","_max","Cart.groupBy","Cart.aggregate","CartItem.findUnique","CartItem.findUniqueOrThrow","CartItem.findFirst","CartItem.findFirstOrThrow","CartItem.findMany","CartItem.createOne","CartItem.createMany","CartItem.createManyAndReturn","CartItem.updateOne","CartItem.updateMany","CartItem.updateManyAndReturn","CartItem.upsertOne","CartItem.deleteOne","CartItem.deleteMany","_avg","_sum","CartItem.groupBy","CartItem.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Meals.findUnique","Meals.findUniqueOrThrow","Meals.findFirst","Meals.findFirstOrThrow","Meals.findMany","Meals.createOne","Meals.createMany","Meals.createManyAndReturn","Meals.updateOne","Meals.updateMany","Meals.updateManyAndReturn","Meals.upsertOne","Meals.deleteOne","Meals.deleteMany","Meals.groupBy","Meals.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","ProviderProfile.findUnique","ProviderProfile.findUniqueOrThrow","ProviderProfile.findFirst","ProviderProfile.findFirstOrThrow","ProviderProfile.findMany","ProviderProfile.createOne","ProviderProfile.createMany","ProviderProfile.createManyAndReturn","ProviderProfile.updateOne","ProviderProfile.updateMany","ProviderProfile.updateManyAndReturn","ProviderProfile.upsertOne","ProviderProfile.deleteOne","ProviderProfile.deleteMany","ProviderProfile.groupBy","ProviderProfile.aggregate","Reviews.findUnique","Reviews.findUniqueOrThrow","Reviews.findFirst","Reviews.findFirstOrThrow","Reviews.findMany","Reviews.createOne","Reviews.createMany","Reviews.createManyAndReturn","Reviews.updateOne","Reviews.updateMany","Reviews.updateManyAndReturn","Reviews.upsertOne","Reviews.deleteOne","Reviews.deleteMany","Reviews.groupBy","Reviews.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","Role","role","Status","status","phone","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","customerId","mealId","orderItemId","rating","comment","userId","businessName","businessSubtitle","businessPhone","businessAdress","description","city","businessLogo","isOpen","orderId","categoryId","quantity","unitPrice","providerId","OrderSatus","deliveryAddress","PaymentMethod","paymentMethod","deliveryCharge","totalAmount","placedAt","cancelledAt","deliveredAt","title","price","imageURL","isAvailable","dietary_preferences","has","hasEvery","hasSome","slug","logo","cartId","cartId_mealId","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","push","increment","decrement","multiply","divide"]'),
  graph: "mAVakAEJBgAAogIAIBIAALkCACCrAQAAuAIAMKwBAAAoABCtAQAAuAIAMK4BAQAAAAG3AUAAkwIAIbgBQACTAgAhxwEBAAAAAQEAAAABACASAQAAogIAIAUAAKMCACAQAACVAgAgqwEAAKACADCsAQAAAwAQrQEAAKACADCuAQEAjwIAIbcBQACTAgAhuAFAAJMCACHMAQEAjwIAIc0BAQCPAgAhzgEBAI8CACHPAQEAkgIAIdABAQCSAgAh0QEBAJICACHSAQEAkgIAIdMBAQCPAgAh1AEgAKECACEBAAAAAwAgEwQAAL8CACAHAAC1AgAgCwAAyQIAIA0AAJYCACAPAAC5AgAgqwEAAMoCADCsAQAABQAQrQEAAMoCADCuAQEAjwIAIbcBQACTAgAhuAFAAJMCACHRAQEAkgIAIdYBAQCPAgAh2QEBAI8CACHjAQEAjwIAIeQBAgC9AgAh5QEBAI8CACHmASAAoQIAIecBAACyAgAgBgQAAP0DACAHAAC3BAAgCwAAxgQAIA0AAP8DACAPAADCBAAg0QEAAMsCACATBAAAvwIAIAcAALUCACALAADJAgAgDQAAlgIAIA8AALkCACCrAQAAygIAMKwBAAAFABCtAQAAygIAMK4BAQAAAAG3AUAAkwIAIbgBQACTAgAh0QEBAJICACHWAQEAjwIAIdkBAQCPAgAh4wEBAI8CACHkAQIAvQIAIeUBAQCPAgAh5gEgAKECACHnAQAAsgIAIAMAAAAFACACAAAGADADAAAHACADAAAABQAgAgAABgAwAwAABwAgDQkAAMgCACAKAADDAgAgCwAAyQIAIA0AAJYCACCrAQAAxwIAMKwBAAAKABCtAQAAxwIAMK4BAQCPAgAhyAEBAI8CACHVAQEAjwIAIdYBAQCPAgAh1wECAL0CACHYAQIAvQIAIQQJAADFBAAgCgAAwwQAIAsAAMYEACANAAD_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_QEAIbcBQACBAgAhuAFAAIECACHHAQEA_QEAIQMAAAAoACACAABAADAkAABBACADAAAAKAAgAgAALwAwAwAAAQAgAQAAABsAIAEAAAAbACADAAAAGQAgAgAAGgAwAwAAGwAgAwAAABkAIAIAABoAMAMAABsAIAMAAAAZACACAAAaADADAAAbACAGCgAA7AIAIA4AANwDACCuAQEAAAAByAEBAAAAAdcBAgAAAAHtAQEAAAABARgAAEkAIASuAQEAAAAByAEBAAAAAdcBAgAAAAHtAQEAAAABARgAAEsAMAEYAABLADAGCgAA6gIAIA4AANoDACCuAQEAzwIAIcgBAQDPAgAh1wECAOgCACHtAQEAzwIAIQIAAAAbACAYAABOACAErgEBAM8CACHIAQEAzwIAIdcBAgDoAgAh7QEBAM8CACECAAAAGQAgGAAAUAAgAgAAABkAIBgAAFAAIAMAAAAbACAfAABJACAgAABOACABAAAAGwAgAQAAABkAIAUIAAC4BAAgJQAAuwQAICYAALoEACA3AAC5BAAgOAAAvAQAIAerAQAAtgIAMKwBAABXABCtAQAAtgIAMK4BAQD9AQAhyAEBAP0BACHXAQIApQIAIe0BAQD9AQAhAwAAABkAIAIAAFYAMCQAAFcAIAMAAAAZACACAAAaADADAAAbACAMBQAAowIAIAcAALUCACCrAQAAtAIAMKwBAABdABCtAQAAtAIAMK4BAQAAAAGvAQEAAAABtwFAAJMCACG4AUAAkwIAIdEBAQCSAgAh6wEBAAAAAewBAQCPAgAhAQAAAFoAIAEAAABaACAMBQAAowIAIAcAALUCACCrAQAAtAIAMKwBAABdABCtAQAAtAIAMK4BAQCPAgAhrwEBAI8CACG3AUAAkwIAIbgBQACTAgAh0QEBAJICACHrAQEAkgIAIewBAQCPAgAhBAUAAIwEACAHAAC3BAAg0QEAAMsCACDrAQAAywIAIAMAAABdACACAABeADADAABaACADAAAAXQAgAgAAXgAwAwAAWgAgAwAAAF0AIAIAAF4AMAMAAFoAIAkFAAC1BAAgBwAAtgQAIK4BAQAAAAGvAQEAAAABtwFAAAAAAbgBQAAAAAHRAQEAAAAB6wEBAAAAAewBAQAAAAEBGAAAYgAgB64BAQAAAAGvAQEAAAABtwFAAAAAAbgBQAAAAAHRAQEAAAAB6wEBAAAAAewBAQAAAAEBGAAAZAAwARgAAGQAMAkFAAChBAAgBwAAogQAIK4BAQDPAgAhrwEBAM8CACG3AUAA0wIAIbgBQADTAgAh0QEBANICACHrAQEA0gIAIewBAQDPAgAhAgAAAFoAIBgAAGcAIAeuAQEAzwIAIa8BAQDPAgAhtwFAANMCACG4AUAA0wIAIdEBAQDSAgAh6wEBANICACHsAQEAzwIAIQIAAABdACAYAABpACACAAAAXQAgGAAAaQAgAwAAAFoAIB8AAGIAICAAAGcAIAEAAABaACABAAAAXQAgBQgAAJ4EACAlAACgBAAgJgAAnwQAINEBAADLAgAg6wEAAMsCACAKqwEAALMCADCsAQAAcAAQrQEAALMCADCuAQEA_QEAIa8BAQD9AQAhtwFAAIECACG4AUAAgQIAIdEBAQCAAgAh6wEBAIACACHsAQEA_QEAIQMAAABdACACAABvADAkAABwACADAAAAXQAgAgAAXgAwAwAAWgAgAQAAAAcAIAEAAAAHACADAAAABQAgAgAABgAwAwAABwAgAwAAAAUAIAIAAAYAMAMAAAcAIAMAAAAFACACAAAGADADAAAHACAQBAAAnQQAIAcAAPUDACALAADzAwAgDQAA9AMAIA8AAPYDACCuAQEAAAABtwFAAAAAAbgBQAAAAAHRAQEAAAAB1gEBAAAAAdkBAQAAAAHjAQEAAAAB5AECAAAAAeUBAQAAAAHmASAAAAAB5wEAAPIDACABGAAAeAAgC64BAQAAAAG3AUAAAAABuAFAAAAAAdEBAQAAAAHWAQEAAAAB2QEBAAAAAeMBAQAAAAHkAQIAAAAB5QEBAAAAAeYBIAAAAAHnAQAA8gMAIAEYAAB6ADABGAAAegAwEAQAAJwEACAHAADQAwAgCwAAzgMAIA0AAM8DACAPAADRAwAgrgEBAM8CACG3AUAA0wIAIbgBQADTAgAh0QEBANICACHWAQEAzwIAIdkBAQDPAgAh4wEBAM8CACHkAQIA6AIAIeUBAQDPAgAh5gEgALQDACHnAQAAzAMAIAIAAAAHACAYAAB9ACALrgEBAM8CACG3AUAA0wIAIbgBQADTAgAh0QEBANICACHWAQEAzwIAIdkBAQDPAgAh4wEBAM8CACHkAQIA6AIAIeUBAQDPAgAh5gEgALQDACHnAQAAzAMAIAIAAAAFACAYAAB_ACACAAAABQAgGAAAfwAgAwAAAAcAIB8AAHgAICAAAH0AIAEAAAAHACABAAAABQAgBggAAJcEACAlAACaBAAgJgAAmQQAIDcAAJgEACA4AACbBAAg0QEAAMsCACAOqwEAALECADCsAQAAhgEAEK0BAACxAgAwrgEBAP0BACG3AUAAgQIAIbgBQACBAgAh0QEBAIACACHWAQEA_QEAIdkBAQD9AQAh4wEBAP0BACHkAQIApQIAIeUBAQD9AQAh5gEgAJ0CACHnAQAAsgIAIAMAAAAFACACAACFAQAwJAAAhgEAIAMAAAAFACACAAAGADADAAAHACABAAAAIgAgAQAAACIAIAMAAAAgACACAAAhADADAAAiACADAAAAIAAgAgAAIQAwAwAAIgAgAwAAACAAIAIAACEAMAMAACIAIBAEAACtAwAgBgAAwQMAIAcAAK4DACCuAQEAAAABtQEAAADbAQK3AUAAAAABuAFAAAAAAccBAQAAAAHZAQEAAAAB2wEBAAAAAd0BAAAA3QEC3gECAAAAAd8BAgAAAAHgAUAAAAAB4QFAAAAAAeIBQAAAAAEBGAAAjgEAIA2uAQEAAAABtQEAAADbAQK3AUAAAAABuAFAAAAAAccBAQAAAAHZAQEAAAAB2wEBAAAAAd0BAAAA3QEC3gECAAAAAd8BAgAAAAHgAUAAAAAB4QFAAAAAAeIBQAAAAAEBGAAAkAEAMAEYAACQAQAwEAQAAI0DACAGAAC_AwAgBwAAjgMAIK4BAQDPAgAhtQEAAIkD2wEitwFAANMCACG4AUAA0wIAIccBAQDPAgAh2QEBAM8CACHbAQEAzwIAId0BAACKA90BIt4BAgDoAgAh3wECAOgCACHgAUAA0wIAIeEBQACLAwAh4gFAAIsDACECAAAAIgAgGAAAkwEAIA2uAQEAzwIAIbUBAACJA9sBIrcBQADTAgAhuAFAANMCACHHAQEAzwIAIdkBAQDPAgAh2wEBAM8CACHdAQAAigPdASLeAQIA6AIAId8BAgDoAgAh4AFAANMCACHhAUAAiwMAIeIBQACLAwAhAgAAACAAIBgAAJUBACACAAAAIAAgGAAAlQEAIAMAAAAiACAfAACOAQAgIAAAkwEAIAEAAAAiACABAAAAIAAgBwgAAJIEACAlAACVBAAgJgAAlAQAIDcAAJMEACA4AACWBAAg4QEAAMsCACDiAQAAywIAIBCrAQAApwIAMKwBAACcAQAQrQEAAKcCADCuAQEA_QEAIbUBAACoAtsBIrcBQACBAgAhuAFAAIECACHHAQEA_QEAIdkBAQD9AQAh2wEBAP0BACHdAQAAqQLdASLeAQIApQIAId8BAgClAgAh4AFAAIECACHhAUAAqgIAIeIBQACqAgAhAwAAACAAIAIAAJsBADAkAACcAQAgAwAAACAAIAIAACEAMAMAACIAIAEAAAAMACABAAAADAAgAwAAAAoAIAIAAAsAMAMAAAwAIAMAAAAKACACAAALADADAAAMACADAAAACgAgAgAACwAwAwAADAAgCgkAAOcDACAKAACpAwAgCwAAqgMAIA0AAKsDACCuAQEAAAAByAEBAAAAAdUBAQAAAAHWAQEAAAAB1wECAAAAAdgBAgAAAAEBGAAApAEAIAauAQEAAAAByAEBAAAAAdUBAQAAAAHWAQEAAAAB1wECAAAAAdgBAgAAAAEBGAAApgEAMAEYAACmAQAwCgkAAOUDACAKAACaAwAgCwAAmwMAIA0AAJwDACCuAQEAzwIAIcgBAQDPAgAh1QEBAM8CACHWAQEAzwIAIdcBAgDoAgAh2AECAOgCACECAAAADAAgGAAAqQEAIAauAQEAzwIAIcgBAQDPAgAh1QEBAM8CACHWAQEAzwIAIdcBAgDoAgAh2AECAOgCACECAAAACgAgGAAAqwEAIAIAAAAKACAYAACrAQAgAwAAAAwAIB8AAKQBACAgAACpAQAgAQAAAAwAIAEAAAAKACAFCAAAjQQAICUAAJAEACAmAACPBAAgNwAAjgQAIDgAAJEEACAJqwEAAKQCADCsAQAAsgEAEK0BAACkAgAwrgEBAP0BACHIAQEA_QEAIdUBAQD9AQAh1gEBAP0BACHXAQIApQIAIdgBAgClAgAhAwAAAAoAIAIAALEBADAkAACyAQAgAwAAAAoAIAIAAAsAMAMAAAwAIBIBAACiAgAgBQAAowIAIBAAAJUCACCrAQAAoAIAMKwBAAADABCtAQAAoAIAMK4BAQAAAAG3AUAAkwIAIbgBQACTAgAhzAEBAAAAAc0BAQCPAgAhzgEBAI8CACHPAQEAkgIAIdABAQCSAgAh0QEBAJICACHSAQEAkgIAIdMBAQCPAgAh1AEgAKECACEBAAAAtQEAIAEAAAC1AQAgBwEAAIsEACAFAACMBAAgEAAA_gMAIM8BAADLAgAg0AEAAMsCACDRAQAAywIAINIBAADLAgAgAwAAAAMAIAIAALgBADADAAC1AQAgAwAAAAMAIAIAALgBADADAAC1AQAgAwAAAAMAIAIAALgBADADAAC1AQAgDwEAAIoEACAFAAD3AwAgEAAA-AMAIK4BAQAAAAG3AUAAAAABuAFAAAAAAcwBAQAAAAHNAQEAAAABzgEBAAAAAc8BAQAAAAHQAQEAAAAB0QEBAAAAAdIBAQAAAAHTAQEAAAAB1AEgAAAAAQEYAAC8AQAgDK4BAQAAAAG3AUAAAAABuAFAAAAAAcwBAQAAAAHNAQEAAAABzgEBAAAAAc8BAQAAAAHQAQEAAAAB0QEBAAAAAdIBAQAAAAHTAQEAAAAB1AEgAAAAAQEYAAC-AQAwARgAAL4BADAPAQAAiQQAIAUAALUDACAQAAC2AwAgrgEBAM8CACG3AUAA0wIAIbgBQADTAgAhzAEBAM8CACHNAQEAzwIAIc4BAQDPAgAhzwEBANICACHQAQEA0gIAIdEBAQDSAgAh0gEBANICACHTAQEAzwIAIdQBIAC0AwAhAgAAALUBACAYAADBAQAgDK4BAQDPAgAhtwFAANMCACG4AUAA0wIAIcwBAQDPAgAhzQEBAM8CACHOAQEAzwIAIc8BAQDSAgAh0AEBANICACHRAQEA0gIAIdIBAQDSAgAh0wEBAM8CACHUASAAtAMAIQIAAAADACAYAADDAQAgAgAAAAMAIBgAAMMBACADAAAAtQEAIB8AALwBACAgAADBAQAgAQAAALUBACABAAAAAwAgBwgAAIYEACAlAACIBAAgJgAAhwQAIM8BAADLAgAg0AEAAMsCACDRAQAAywIAINIBAADLAgAgD6sBAACcAgAwrAEAAMoBABCtAQAAnAIAMK4BAQD9AQAhtwFAAIECACG4AUAAgQIAIcwBAQD9AQAhzQEBAP0BACHOAQEA_QEAIc8BAQCAAgAh0AEBAIACACHRAQEAgAIAIdIBAQCAAgAh0wEBAP0BACHUASAAnQIAIQMAAAADACACAADJAQAwJAAAygEAIAMAAAADACACAAC4AQAwAwAAtQEAIAEAAAASACABAAAAEgAgAwAAABAAIAIAABEAMAMAABIAIAMAAAAQACACAAARADADAAASACADAAAAEAAgAgAAEQAwAwAAEgAgCwYAAKcDACAKAAD9AgAgDAAA_gIAIK4BAQAAAAG3AUAAAAABuAFAAAAAAccBAQAAAAHIAQEAAAAByQEBAAAAAcoBCAAAAAHLAQEAAAABARgAANIBACAIrgEBAAAAAbcBQAAAAAG4AUAAAAABxwEBAAAAAcgBAQAAAAHJAQEAAAABygEIAAAAAcsBAQAAAAEBGAAA1AEAMAEYAADUAQAwCwYAAKUDACAKAAD6AgAgDAAA-wIAIK4BAQDPAgAhtwFAANMCACG4AUAA0wIAIccBAQDPAgAhyAEBAM8CACHJAQEAzwIAIcoBCAD4AgAhywEBANICACECAAAAEgAgGAAA1wEAIAiuAQEAzwIAIbcBQADTAgAhuAFAANMCACHHAQEAzwIAIcgBAQDPAgAhyQEBAM8CACHKAQgA-AIAIcsBAQDSAgAhAgAAABAAIBgAANkBACACAAAAEAAgGAAA2QEAIAMAAAASACAfAADSAQAgIAAA1wEAIAEAAAASACABAAAAEAAgBggAAIEEACAlAACEBAAgJgAAgwQAIDcAAIIEACA4AACFBAAgywEAAMsCACALqwEAAJgCADCsAQAA4AEAEK0BAACYAgAwrgEBAP0BACG3AUAAgQIAIbgBQACBAgAhxwEBAP0BACHIAQEA_QEAIckBAQD9AQAhygEIAJkCACHLAQEAgAIAIQMAAAAQACACAADfAQAwJAAA4AEAIAMAAAAQACACAAARADADAAASACAQDQAAlgIAIA4AAJcCACAQAACVAgAgEQAAlAIAIKsBAACOAgAwrAEAAOYBABCtAQAAjgIAMK4BAQAAAAGvAQEAjwIAIbABAQAAAAGxAQEAjwIAIbMBAACQArMBIrUBAACRArUBIrYBAQCSAgAhtwFAAJMCACG4AUAAkwIAIQEAAADjAQAgAQAAAOMBACAQDQAAlgIAIA4AAJcCACAQAACVAgAgEQAAlAIAIKsBAACOAgAwrAEAAOYBABCtAQAAjgIAMK4BAQCPAgAhrwEBAI8CACGwAQEAjwIAIbEBAQCPAgAhswEAAJACswEitQEAAJECtQEitgEBAJICACG3AUAAkwIAIbgBQACTAgAhBQ0AAP8DACAOAACABAAgEAAA_gMAIBEAAP0DACC2AQAAywIAIAMAAADmAQAgAgAA5wEAMAMAAOMBACADAAAA5gEAIAIAAOcBADADAADjAQAgAwAAAOYBACACAADnAQAwAwAA4wEAIA0NAAD7AwAgDgAA_AMAIBAAAPoDACARAAD5AwAgrgEBAAAAAa8BAQAAAAGwAQEAAAABsQEBAAAAAbMBAAAAswECtQEAAAC1AQK2AQEAAAABtwFAAAAAAbgBQAAAAAEBGAAA6wEAIAmuAQEAAAABrwEBAAAAAbABAQAAAAGxAQEAAAABswEAAACzAQK1AQAAALUBArYBAQAAAAG3AUAAAAABuAFAAAAAAQEYAADtAQAwARgAAO0BADANDQAA1gIAIA4AANcCACAQAADVAgAgEQAA1AIAIK4BAQDPAgAhrwEBAM8CACGwAQEAzwIAIbEBAQDPAgAhswEAANACswEitQEAANECtQEitgEBANICACG3AUAA0wIAIbgBQADTAgAhAgAAAOMBACAYAADwAQAgCa4BAQDPAgAhrwEBAM8CACGwAQEAzwIAIbEBAQDPAgAhswEAANACswEitQEAANECtQEitgEBANICACG3AUAA0wIAIbgBQADTAgAhAgAAAOYBACAYAADyAQAgAgAAAOYBACAYAADyAQAgAwAAAOMBACAfAADrAQAgIAAA8AEAIAEAAADjAQAgAQAAAOYBACAECAAAzAIAICUAAM4CACAmAADNAgAgtgEAAMsCACAMqwEAAPwBADCsAQAA-QEAEK0BAAD8AQAwrgEBAP0BACGvAQEA_QEAIbABAQD9AQAhsQEBAP0BACGzAQAA_gGzASK1AQAA_wG1ASK2AQEAgAIAIbcBQACBAgAhuAFAAIECACEDAAAA5gEAIAIAAPgBADAkAAD5AQAgAwAAAOYBACACAADnAQAwAwAA4wEAIAyrAQAA_AEAMKwBAAD5AQAQrQEAAPwBADCuAQEA_QEAIa8BAQD9AQAhsAEBAP0BACGxAQEA_QEAIbMBAAD-AbMBIrUBAAD_AbUBIrYBAQCAAgAhtwFAAIECACG4AUAAgQIAIQ4IAACDAgAgJQAAjQIAICYAAI0CACC5AQEAAAABugEBAAAABLsBAQAAAAS8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAIwCACHBAQEAAAABwgEBAAAAAcMBAQAAAAEHCAAAgwIAICUAAIsCACAmAACLAgAguQEAAACzAQK6AQAAALMBCLsBAAAAswEIwAEAAIoCswEiBwgAAIMCACAlAACJAgAgJgAAiQIAILkBAAAAtQECugEAAAC1AQi7AQAAALUBCMABAACIArUBIg4IAACGAgAgJQAAhwIAICYAAIcCACC5AQEAAAABugEBAAAABbsBAQAAAAW8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAIUCACHBAQEAAAABwgEBAAAAAcMBAQAAAAELCAAAgwIAICUAAIQCACAmAACEAgAguQFAAAAAAboBQAAAAAS7AUAAAAAEvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcABQACCAgAhCwgAAIMCACAlAACEAgAgJgAAhAIAILkBQAAAAAG6AUAAAAAEuwFAAAAABLwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAAggIAIQi5AQIAAAABugECAAAABLsBAgAAAAS8AQIAAAABvQECAAAAAb4BAgAAAAG_AQIAAAABwAECAIMCACEIuQFAAAAAAboBQAAAAAS7AUAAAAAEvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcABQACEAgAhDggAAIYCACAlAACHAgAgJgAAhwIAILkBAQAAAAG6AQEAAAAFuwEBAAAABbwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHAAQEAhQIAIcEBAQAAAAHCAQEAAAABwwEBAAAAAQi5AQIAAAABugECAAAABbsBAgAAAAW8AQIAAAABvQECAAAAAb4BAgAAAAG_AQIAAAABwAECAIYCACELuQEBAAAAAboBAQAAAAW7AQEAAAAFvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQCHAgAhwQEBAAAAAcIBAQAAAAHDAQEAAAABBwgAAIMCACAlAACJAgAgJgAAiQIAILkBAAAAtQECugEAAAC1AQi7AQAAALUBCMABAACIArUBIgS5AQAAALUBAroBAAAAtQEIuwEAAAC1AQjAAQAAiQK1ASIHCAAAgwIAICUAAIsCACAmAACLAgAguQEAAACzAQK6AQAAALMBCLsBAAAAswEIwAEAAIoCswEiBLkBAAAAswECugEAAACzAQi7AQAAALMBCMABAACLArMBIg4IAACDAgAgJQAAjQIAICYAAI0CACC5AQEAAAABugEBAAAABLsBAQAAAAS8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAIwCACHBAQEAAAABwgEBAAAAAcMBAQAAAAELuQEBAAAAAboBAQAAAAS7AQEAAAAEvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcABAQCNAgAhwQEBAAAAAcIBAQAAAAHDAQEAAAABEA0AAJYCACAOAACXAgAgEAAAlQIAIBEAAJQCACCrAQAAjgIAMKwBAADmAQAQrQEAAI4CADCuAQEAjwIAIa8BAQCPAgAhsAEBAI8CACGxAQEAjwIAIbMBAACQArMBIrUBAACRArUBIrYBAQCSAgAhtwFAAJMCACG4AUAAkwIAIQu5AQEAAAABugEBAAAABLsBAQAAAAS8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAI0CACHBAQEAAAABwgEBAAAAAcMBAQAAAAEEuQEAAACzAQK6AQAAALMBCLsBAAAAswEIwAEAAIsCswEiBLkBAAAAtQECugEAAAC1AQi7AQAAALUBCMABAACJArUBIgu5AQEAAAABugEBAAAABbsBAQAAAAW8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAIcCACHBAQEAAAABwgEBAAAAAcMBAQAAAAEIuQFAAAAAAboBQAAAAAS7AUAAAAAEvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcABQACEAgAhFAEAAKICACAFAACjAgAgEAAAlQIAIKsBAACgAgAwrAEAAAMAEK0BAACgAgAwrgEBAI8CACG3AUAAkwIAIbgBQACTAgAhzAEBAI8CACHNAQEAjwIAIc4BAQCPAgAhzwEBAJICACHQAQEAkgIAIdEBAQCSAgAh0gEBAJICACHTAQEAjwIAIdQBIAChAgAh7wEAAAMAIPABAAADACADxAEAACAAIMUBAAAgACDGAQAAIAAgA8QBAAAQACDFAQAAEAAgxgEAABAAIAsGAACiAgAgEgAAuQIAIKsBAAC4AgAwrAEAACgAEK0BAAC4AgAwrgEBAI8CACG3AUAAkwIAIbgBQACTAgAhxwEBAI8CACHvAQAAKAAg8AEAACgAIAurAQAAmAIAMKwBAADgAQAQrQEAAJgCADCuAQEA_QEAIbcBQACBAgAhuAFAAIECACHHAQEA_QEAIcgBAQD9AQAhyQEBAP0BACHKAQgAmQIAIcsBAQCAAgAhDQgAAIMCACAlAACbAgAgJgAAmwIAIDcAAJsCACA4AACbAgAguQEIAAAAAboBCAAAAAS7AQgAAAAEvAEIAAAAAb0BCAAAAAG-AQgAAAABvwEIAAAAAcABCACaAgAhDQgAAIMCACAlAACbAgAgJgAAmwIAIDcAAJsCACA4AACbAgAguQEIAAAAAboBCAAAAAS7AQgAAAAEvAEIAAAAAb0BCAAAAAG-AQgAAAABvwEIAAAAAcABCACaAgAhCLkBCAAAAAG6AQgAAAAEuwEIAAAABLwBCAAAAAG9AQgAAAABvgEIAAAAAb8BCAAAAAHAAQgAmwIAIQ-rAQAAnAIAMKwBAADKAQAQrQEAAJwCADCuAQEA_QEAIbcBQACBAgAhuAFAAIECACHMAQEA_QEAIc0BAQD9AQAhzgEBAP0BACHPAQEAgAIAIdABAQCAAgAh0QEBAIACACHSAQEAgAIAIdMBAQD9AQAh1AEgAJ0CACEFCAAAgwIAICUAAJ8CACAmAACfAgAguQEgAAAAAcABIACeAgAhBQgAAIMCACAlAACfAgAgJgAAnwIAILkBIAAAAAHAASAAngIAIQK5ASAAAAABwAEgAJ8CACESAQAAogIAIAUAAKMCACAQAACVAgAgqwEAAKACADCsAQAAAwAQrQEAAKACADCuAQEAjwIAIbcBQACTAgAhuAFAAJMCACHMAQEAjwIAIc0BAQCPAgAhzgEBAI8CACHPAQEAkgIAIdABAQCSAgAh0QEBAJICACHSAQEAkgIAIdMBAQCPAgAh1AEgAKECACECuQEgAAAAAcABIACfAgAhEg0AAJYCACAOAACXAgAgEAAAlQIAIBEAAJQCACCrAQAAjgIAMKwBAADmAQAQrQEAAI4CADCuAQEAjwIAIa8BAQCPAgAhsAEBAI8CACGxAQEAjwIAIbMBAACQArMBIrUBAACRArUBIrYBAQCSAgAhtwFAAJMCACG4AUAAkwIAIe8BAADmAQAg8AEAAOYBACADxAEAAAUAIMUBAAAFACDGAQAABQAgCasBAACkAgAwrAEAALIBABCtAQAApAIAMK4BAQD9AQAhyAEBAP0BACHVAQEA_QEAIdYBAQD9AQAh1wECAKUCACHYAQIApQIAIQ0IAACDAgAgJQAAgwIAICYAAIMCACA3AACbAgAgOAAAgwIAILkBAgAAAAG6AQIAAAAEuwECAAAABLwBAgAAAAG9AQIAAAABvgECAAAAAb8BAgAAAAHAAQIApgIAIQ0IAACDAgAgJQAAgwIAICYAAIMCACA3AACbAgAgOAAAgwIAILkBAgAAAAG6AQIAAAAEuwECAAAABLwBAgAAAAG9AQIAAAABvgECAAAAAb8BAgAAAAHAAQIApgIAIRCrAQAApwIAMKwBAACcAQAQrQEAAKcCADCuAQEA_QEAIbUBAACoAtsBIrcBQACBAgAhuAFAAIECACHHAQEA_QEAIdkBAQD9AQAh2wEBAP0BACHdAQAAqQLdASLeAQIApQIAId8BAgClAgAh4AFAAIECACHhAUAAqgIAIeIBQACqAgAhBwgAAIMCACAlAACwAgAgJgAAsAIAILkBAAAA2wECugEAAADbAQi7AQAAANsBCMABAACvAtsBIgcIAACDAgAgJQAArgIAICYAAK4CACC5AQAAAN0BAroBAAAA3QEIuwEAAADdAQjAAQAArQLdASILCAAAhgIAICUAAKwCACAmAACsAgAguQFAAAAAAboBQAAAAAW7AUAAAAAFvAFAAAAAAb0BQAAAAAG-AUAAAAABvwFAAAAAAcABQACrAgAhCwgAAIYCACAlAACsAgAgJgAArAIAILkBQAAAAAG6AUAAAAAFuwFAAAAABbwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAAqwIAIQi5AUAAAAABugFAAAAABbsBQAAAAAW8AUAAAAABvQFAAAAAAb4BQAAAAAG_AUAAAAABwAFAAKwCACEHCAAAgwIAICUAAK4CACAmAACuAgAguQEAAADdAQK6AQAAAN0BCLsBAAAA3QEIwAEAAK0C3QEiBLkBAAAA3QECugEAAADdAQi7AQAAAN0BCMABAACuAt0BIgcIAACDAgAgJQAAsAIAICYAALACACC5AQAAANsBAroBAAAA2wEIuwEAAADbAQjAAQAArwLbASIEuQEAAADbAQK6AQAAANsBCLsBAAAA2wEIwAEAALAC2wEiDqsBAACxAgAwrAEAAIYBABCtAQAAsQIAMK4BAQD9AQAhtwFAAIECACG4AUAAgQIAIdEBAQCAAgAh1gEBAP0BACHZAQEA_QEAIeMBAQD9AQAh5AECAKUCACHlAQEA_QEAIeYBIACdAgAh5wEAALICACAEuQEBAAAABegBAQAAAAHpAQEAAAAE6gEBAAAABAqrAQAAswIAMKwBAABwABCtAQAAswIAMK4BAQD9AQAhrwEBAP0BACG3AUAAgQIAIbgBQACBAgAh0QEBAIACACHrAQEAgAIAIewBAQD9AQAhDAUAAKMCACAHAAC1AgAgqwEAALQCADCsAQAAXQAQrQEAALQCADCuAQEAjwIAIa8BAQCPAgAhtwFAAJMCACG4AUAAkwIAIdEBAQCSAgAh6wEBAJICACHsAQEAjwIAIQPEAQAACgAgxQEAAAoAIMYBAAAKACAHqwEAALYCADCsAQAAVwAQrQEAALYCADCuAQEA_QEAIcgBAQD9AQAh1wECAKUCACHtAQEA_QEAIQerAQAAtwIAMKwBAABBABCtAQAAtwIAMK4BAQD9AQAhtwFAAIECACG4AUAAgQIAIccBAQD9AQAhCQYAAKICACASAAC5AgAgqwEAALgCADCsAQAAKAAQrQEAALgCADCuAQEAjwIAIbcBQACTAgAhuAFAAJMCACHHAQEAjwIAIQPEAQAAGQAgxQEAABkAIMYBAAAZACATBAAAvwIAIAYAAKICACAHAAC1AgAgqwEAALoCADCsAQAAIAAQrQEAALoCADCuAQEAjwIAIbUBAAC7AtsBIrcBQACTAgAhuAFAAJMCACHHAQEAjwIAIdkBAQCPAgAh2wEBAI8CACHdAQAAvALdASLeAQIAvQIAId8BAgC9AgAh4AFAAJMCACHhAUAAvgIAIeIBQAC-AgAhBLkBAAAA2wECugEAAADbAQi7AQAAANsBCMABAACwAtsBIgS5AQAAAN0BAroBAAAA3QEIuwEAAADdAQjAAQAArgLdASIIuQECAAAAAboBAgAAAAS7AQIAAAAEvAECAAAAAb0BAgAAAAG-AQIAAAABvwECAAAAAcABAgCDAgAhCLkBQAAAAAG6AUAAAAAFuwFAAAAABbwBQAAAAAG9AUAAAAABvgFAAAAAAb8BQAAAAAHAAUAArAIAIRQBAACiAgAgBQAAowIAIBAAAJUCACCrAQAAoAIAMKwBAAADABCtAQAAoAIAMK4BAQCPAgAhtwFAAJMCACG4AUAAkwIAIcwBAQCPAgAhzQEBAI8CACHOAQEAjwIAIc8BAQCSAgAh0AEBAJICACHRAQEAkgIAIdIBAQCSAgAh0wEBAI8CACHUASAAoQIAIe8BAAADACDwAQAAAwAgAsgBAQAAAAHtAQEAAAABCQoAAMMCACAOAADCAgAgqwEAAMECADCsAQAAGQAQrQEAAMECADCuAQEAjwIAIcgBAQCPAgAh1wECAL0CACHtAQEAjwIAIQsGAACiAgAgEgAAuQIAIKsBAAC4AgAwrAEAACgAEK0BAAC4AgAwrgEBAI8CACG3AUAAkwIAIbgBQACTAgAhxwEBAI8CACHvAQAAKAAg8AEAACgAIBUEAAC_AgAgBwAAtQIAIAsAAMkCACANAACWAgAgDwAAuQIAIKsBAADKAgAwrAEAAAUAEK0BAADKAgAwrgEBAI8CACG3AUAAkwIAIbgBQACTAgAh0QEBAJICACHWAQEAjwIAIdkBAQCPAgAh4wEBAI8CACHkAQIAvQIAIeUBAQCPAgAh5gEgAKECACHnAQAAsgIAIO8BAAAFACDwAQAABQAgDgYAAKICACAKAADDAgAgDAAAxgIAIKsBAADEAgAwrAEAABAAEK0BAADEAgAwrgEBAI8CACG3AUAAkwIAIbgBQACTAgAhxwEBAI8CACHIAQEAjwIAIckBAQCPAgAhygEIAMUCACHLAQEAkgIAIQi5AQgAAAABugEIAAAABLsBCAAAAAS8AQgAAAABvQEIAAAAAb4BCAAAAAG_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_AECAAAAAf0BAgAAAAH-AQIAAAABBAoAAOoCACCuAQEAzwIAIcgBAQDPAgAh1wECAOgCACEFHwAAkwUAICAAAJYFACDxAQAAlAUAIPIBAACVBQAg9QEAAAcAIAQKAADsAgAgrgEBAAAAAcgBAQAAAAHXAQIAAAABAx8AAJMFACDxAQAAlAUAIPUBAAAHACAEHwAA3gIAMPEBAADfAgAw9QEAAOICADD2AQAA4QIAIAkKAAD9AgAgDAAA_gIAIK4BAQAAAAG3AUAAAAABuAFAAAAAAcgBAQAAAAHJAQEAAAABygEIAAAAAcsBAQAAAAECAAAAEgAgHwAA_AIAIAMAAAASACAfAAD8AgAgIAAA-QIAIAEYAACSBQAwDgYAAKICACAKAADDAgAgDAAAxgIAIKsBAADEAgAwrAEAABAAEK0BAADEAgAwrgEBAAAAAbcBQACTAgAhuAFAAJMCACHHAQEAjwIAIcgBAQCPAgAhyQEBAI8CACHKAQgAxQIAIcsBAQCSAgAhAgAAABIAIBgAAPkCACACAAAA9gIAIBgAAPcCACALqwEAAPUCADCsAQAA9gIAEK0BAAD1AgAwrgEBAI8CACG3AUAAkwIAIbgBQACTAgAhxwEBAI8CACHIAQEAjwIAIckBAQCPAgAhygEIAMUCACHLAQEAkgIAIQurAQAA9QIAMKwBAAD2AgAQrQEAAPUCADCuAQEAjwIAIbcBQACTAgAhuAFAAJMCACHHAQEAjwIAIcgBAQCPAgAhyQEBAI8CACHKAQgAxQIAIcsBAQCSAgAhB64BAQDPAgAhtwFAANMCACG4AUAA0wIAIcgBAQDPAgAhyQEBAM8CACHKAQgA-AIAIcsBAQDSAgAhBfcBCAAAAAH7AQgAAAAB_AEIAAAAAf0BCAAAAAH-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-AEAAKIDADD5AQAA9QIAMAkGAACnAwAgCgAA_QIAIK4BAQAAAAG3AUAAAAABuAFAAAAAAccBAQAAAAHIAQEAAAABygEIAAAAAcsBAQAAAAECAAAAEgAgHwAApgMAIAMAAAASACAfAACmAwAgIAAApAMAIAEYAAD8BAAwAgAAABIAIBgAAKQDACACAAAA9gIAIBgAAKMDACAHrgEBAM8CACG3AUAA0wIAIbgBQADTAgAhxwEBAM8CACHIAQEAzwIAIcoBCAD4AgAhywEBANICACEJBgAApQMAIAoAAPoCACCuAQEAzwIAIbcBQADTAgAhuAFAANMCACHHAQEAzwIAIcgBAQDPAgAhygEIAPgCACHLAQEA0gIAIQUfAAD3BAAgIAAA-gQAIPEBAAD4BAAg8gEAAPkEACD1AQAA4wEAIAkGAACnAwAgCgAA_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AQCPAgAh5AECAL0CACHlAQEAjwIAIeYBIAChAgAh5wEAALICACAKrgEBAM8CACG3AUAA0wIAIbgBQADTAgAh0QEBANICACHWAQEAzwIAIeMBAQDPAgAh5AECAOgCACHlAQEAzwIAIeYBIAC0AwAh5wEAAMwDACAC9wEBAAAABPoBAQAAAAUOBwAA0AMAIAsAAM4DACANAADPAwAgDwAA0QMAIK4BAQDPAgAhtwFAANMCACG4AUAA0wIAIdEBAQDSAgAh1gEBAM8CACHjAQEAzwIAIeQBAgDoAgAh5QEBAM8CACHmASAAtAMAIecBAADMAwAgBR8AANgEACAgAADoBAAg8QEAANkEACDyAQAA5wQAIPUBAABaACALHwAA6AMAMCAAAOwDADDxAQAA6QMAMPIBAADqAwAw8wEAAPICADD0AQAA8gIAMPUBAADyAgAw9gEAAOsDACD3AQAA8gIAMPgBAADtAwAw-QEAAPUCADALHwAA3QMAMCAAAOEDADDxAQAA3gMAMPIBAADfAwAw8wEAAJMDADD0AQAAkwMAMPUBAACTAwAw9gEAAOADACD3AQAAkwMAMPgBAADiAwAw-QEAAJYDADALHwAA0gMAMCAAANYDADDxAQAA0wMAMPIBAADUAwAw8wEAAOICADD0AQAA4gIAMPUBAADiAgAw9gEAANUDACD3AQAA4gIAMPgBAADXAwAw-QEAAOUCADAEDgAA3AMAIK4BAQAAAAHXAQIAAAAB7QEBAAAAAQIAAAAbACAfAADbAwAgAwAAABsAIB8AANsDACAgAADZAwAgARgAAOYEADACAAAAGwAgGAAA2QMAIAIAAADmAgAgGAAA2AMAIAOuAQEAzwIAIdcBAgDoAgAh7QEBAM8CACEEDgAA2gMAIK4BAQDPAgAh1wECAOgCACHtAQEAzwIAIQUfAADhBAAgIAAA5AQAIPEBAADiBAAg8gEAAOMEACD1AQAAAQAgBA4AANwDACCuAQEAAAAB1wECAAAAAe0BAQAAAAEDHwAA4QQAIPEBAADiBAAg9QEAAAEAIAgJAADnAwAgCwAAqgMAIA0AAKsDACCuAQEAAAAB1QEBAAAAAdYBAQAAAAHXAQIAAAAB2AECAAAAAQIAAAAMACAfAADmAwAgAwAAAAwAIB8AAOYDACAgAADkAwAgARgAAOAEADACAAAADAAgGAAA5AMAIAIAAACXAwAgGAAA4wMAIAWuAQEAzwIAIdUBAQDPAgAh1gEBAM8CACHXAQIA6AIAIdgBAgDoAgAhCAkAAOUDACALAACbAwAgDQAAnAMAIK4BAQDPAgAh1QEBAM8CACHWAQEAzwIAIdcBAgDoAgAh2AECAOgCACEFHwAA2wQAICAAAN4EACDxAQAA3AQAIPIBAADdBAAg9QEAACIAIAgJAADnAwAgCwAAqgMAIA0AAKsDACCuAQEAAAAB1QEBAAAAAdYBAQAAAAHXAQIAAAAB2AECAAAAAQMfAADbBAAg8QEAANwEACD1AQAAIgAgCQYAAKcDACAMAAD-AgAgrgEBAAAAAbcBQAAAAAG4AUAAAAABxwEBAAAAAckBAQAAAAHKAQgAAAABywEBAAAAAQIAAAASACAfAADwAwAgAwAAABIAIB8AAPADACAgAADvAwAgARgAANoEADACAAAAEgAgGAAA7wMAIAIAAAD2AgAgGAAA7gMAIAeuAQEAzwIAIbcBQADTAgAhuAFAANMCACHHAQEAzwIAIckBAQDPAgAhygEIAPgCACHLAQEA0gIAIQkGAAClAwAgDAAA-wIAIK4BAQDPAgAhtwFAANMCACG4AUAA0wIAIccBAQDPAgAhyQEBAM8CACHKAQgA-AIAIcsBAQDSAgAhCQYAAKcDACAMAAD-AgAgrgEBAAAAAbcBQAAAAAG4AUAAAAABxwEBAAAAAckBAQAAAAHKAQgAAAABywEBAAAAAQ4HAAD1AwAgCwAA8wMAIA0AAPQDACAPAAD2AwAgrgEBAAAAAbcBQAAAAAG4AUAAAAAB0QEBAAAAAdYBAQAAAAHjAQEAAAAB5AECAAAAAeUBAQAAAAHmASAAAAAB5wEAAPIDACAB9wEBAAAABAMfAADYBAAg8QEAANkEACD1AQAAWgAgBB8AAOgDADDxAQAA6QMAMPUBAADyAgAw9gEAAOsDACAEHwAA3QMAMPEBAADeAwAw9QEAAJMDADD2AQAA4AMAIAQfAADSAwAw8QEAANMDADD1AQAA4gIAMPYBAADVAwAgBB8AAMIDADDxAQAAwwMAMPUBAADGAwAw9gEAAMUDACAEHwAAtwMAMPEBAAC4AwAw9QEAAIMDADD2AQAAugMAIAMfAACvAwAg8QEAALADACD1AQAAtQEAIAQfAAD_AgAw8QEAAIADADD1AQAAgwMAMPYBAACCAwAgBB8AAO4CADDxAQAA7wIAMPUBAADyAgAw9gEAAPECACADHwAA2AIAIPEBAADZAgAg9QEAAAEAIAcBAACLBAAgBQAAjAQAIBAAAP4DACDPAQAAywIAINABAADLAgAg0QEAAMsCACDSAQAAywIAIAAAAgYAAIsEACASAADCBAAgAAAAAAAAAAAFHwAA0wQAICAAANYEACDxAQAA1AQAIPIBAADVBAAg9QEAAOMBACADHwAA0wQAIPEBAADUBAAg9QEAAOMBACAFDQAA_wMAIA4AAIAEACAQAAD-AwAgEQAA_QMAILYBAADLAgAgAAAAAAAAAAAAAAAAAAAAAAUfAADOBAAgIAAA0QQAIPEBAADPBAAg8gEAANAEACD1AQAAtQEAIAMfAADOBAAg8QEAAM8EACD1AQAAtQEAIAAAAAsfAACsBAAwIAAAsAQAMPEBAACtBAAw8gEAAK4EADDzAQAAxgMAMPQBAADGAwAw9QEAAMYDADD2AQAArwQAIPcBAADGAwAw-AEAALEEADD5AQAAyQMAMAsfAACjBAAwIAAApwQAMPEBAACkBAAw8gEAAKUEADDzAQAAkwMAMPQBAACTAwAw9QEAAJMDADD2AQAApgQAIPcBAACTAwAw-AEAAKgEADD5AQAAlgMAMAgJAADnAwAgCgAAqQMAIA0AAKsDACCuAQEAAAAByAEBAAAAAdUBAQAAAAHXAQIAAAAB2AECAAAAAQIAAAAMACAfAACrBAAgAwAAAAwAIB8AAKsEACAgAACqBAAgARgAAM0EADACAAAADAAgGAAAqgQAIAIAAACXAwAgGAAAqQQAIAWuAQEAzwIAIcgBAQDPAgAh1QEBAM8CACHXAQIA6AIAIdgBAgDoAgAhCAkAAOUDACAKAACaAwAgDQAAnAMAIK4BAQDPAgAhyAEBAM8CACHVAQEAzwIAIdcBAgDoAgAh2AECAOgCACEICQAA5wMAIAoAAKkDACANAACrAwAgrgEBAAAAAcgBAQAAAAHVAQEAAAAB1wECAAAAAdgBAgAAAAEOBAAAnQQAIAcAAPUDACANAAD0AwAgDwAA9gMAIK4BAQAAAAG3AUAAAAABuAFAAAAAAdEBAQAAAAHZAQEAAAAB4wEBAAAAAeQBAgAAAAHlAQEAAAAB5gEgAAAAAecBAADyAwAgAgAAAAcAIB8AALQEACADAAAABwAgHwAAtAQAICAAALMEACABGAAAzAQAMAIAAAAHACAYAACzBAAgAgAAAMoDACAYAACyBAAgCq4BAQDPAgAhtwFAANMCACG4AUAA0wIAIdEBAQDSAgAh2QEBAM8CACHjAQEAzwIAIeQBAgDoAgAh5QEBAM8CACHmASAAtAMAIecBAADMAwAgDgQAAJwEACAHAADQAwAgDQAAzwMAIA8AANEDACCuAQEAzwIAIbcBQADTAgAhuAFAANMCACHRAQEA0gIAIdkBAQDPAgAh4wEBAM8CACHkAQIA6AIAIeUBAQDPAgAh5gEgALQDACHnAQAAzAMAIA4EAACdBAAgBwAA9QMAIA0AAPQDACAPAAD2AwAgrgEBAAAAAbcBQAAAAAG4AUAAAAAB0QEBAAAAAdkBAQAAAAHjAQEAAAAB5AECAAAAAeUBAQAAAAHmASAAAAAB5wEAAPIDACAEHwAArAQAMPEBAACtBAAw9QEAAMYDADD2AQAArwQAIAQfAACjBAAw8QEAAKQEADD1AQAAkwMAMPYBAACmBAAgAAAAAAAAAAAABR8AAMcEACAgAADKBAAg8QEAAMgEACDyAQAAyQQAIPUBAADjAQAgAx8AAMcEACDxAQAAyAQAIPUBAADjAQAgAAYEAAD9AwAgBwAAtwQAIAsAAMYEACANAAD_AwAgDwAAwgQAINEBAADLAgAgBAkAAMUEACAKAADDBAAgCwAAxgQAIA0AAP8DACAFBAAA_QMAIAYAAIsEACAHAAC3BAAg4QEAAMsCACDiAQAAywIAIAQFAACMBAAgBwAAtwQAINEBAADLAgAg6wEAAMsCACAMDQAA-wMAIBAAAPoDACARAAD5AwAgrgEBAAAAAa8BAQAAAAGwAQEAAAABsQEBAAAAAbMBAAAAswECtQEAAAC1AQK2AQEAAAABtwFAAAAAAbgBQAAAAAECAAAA4wEAIB8AAMcEACADAAAA5gEAIB8AAMcEACAgAADLBAAgDgAAAOYBACANAADWAgAgEAAA1QIAIBEAANQCACAYAADLBAAgrgEBAM8CACGvAQEAzwIAIbABAQDPAgAhsQEBAM8CACGzAQAA0AKzASK1AQAA0QK1ASK2AQEA0gIAIbcBQADTAgAhuAFAANMCACEMDQAA1gIAIBAAANUCACARAADUAgAgrgEBAM8CACGvAQEAzwIAIbABAQDPAgAhsQEBAM8CACGzAQAA0AKzASK1AQAA0QK1ASK2AQEA0gIAIbcBQADTAgAhuAFAANMCACEKrgEBAAAAAbcBQAAAAAG4AUAAAAAB0QEBAAAAAdkBAQAAAAHjAQEAAAAB5AECAAAAAeUBAQAAAAHmASAAAAAB5wEAAPIDACAFrgEBAAAAAcgBAQAAAAHVAQEAAAAB1wECAAAAAdgBAgAAAAEOAQAAigQAIBAAAPgDACCuAQEAAAABtwFAAAAAAbgBQAAAAAHMAQEAAAABzQEBAAAAAc4BAQAAAAHPAQEAAAAB0AEBAAAAAdEBAQAAAAHSAQEAAAAB0wEBAAAAAdQBIAAAAAECAAAAtQEAIB8AAM4EACADAAAAAwAgHwAAzgQAICAAANIEACAQAAAAAwAgAQAAiQQAIBAAALYDACAYAADSBAAgrgEBAM8CACG3AUAA0wIAIbgBQADTAgAhzAEBAM8CACHNAQEAzwIAIc4BAQDPAgAhzwEBANICACHQAQEA0gIAIdEBAQDSAgAh0gEBANICACHTAQEAzwIAIdQBIAC0AwAhDgEAAIkEACAQAAC2AwAgrgEBAM8CACG3AUAA0wIAIbgBQADTAgAhzAEBAM8CACHNAQEAzwIAIc4BAQDPAgAhzwEBANICACHQAQEA0gIAIdEBAQDSAgAh0gEBANICACHTAQEAzwIAIdQBIAC0AwAhDA0AAPsDACAOAAD8AwAgEAAA-gMAIK4BAQAAAAGvAQEAAAABsAEBAAAAAbEBAQAAAAGzAQAAALMBArUBAAAAtQECtgEBAAAAAbcBQAAAAAG4AUAAAAABAgAAAOMBACAfAADTBAAgAwAAAOYBACAfAADTBAAgIAAA1wQAIA4AAADmAQAgDQAA1gIAIA4AANcCACAQAADVAgAgGAAA1wQAIK4BAQDPAgAhrwEBAM8CACGwAQEAzwIAIbEBAQDPAgAhswEAANACswEitQEAANECtQEitgEBANICACG3AUAA0wIAIbgBQADTAgAhDA0AANYCACAOAADXAgAgEAAA1QIAIK4BAQDPAgAhrwEBAM8CACGwAQEAzwIAIbEBAQDPAgAhswEAANACswEitQEAANECtQEitgEBANICACG3AUAA0wIAIbgBQADTAgAhCAcAALYEACCuAQEAAAABrwEBAAAAAbcBQAAAAAG4AUAAAAAB0QEBAAAAAesBAQAAAAHsAQEAAAABAgAAAFoAIB8AANgEACAHrgEBAAAAAbcBQAAAAAG4AUAAAAABxwEBAAAAAckBAQAAAAHKAQgAAAABywEBAAAAAQ8EAACtAwAgBgAAwQMAIK4BAQAAAAG1AQAAANsBArcBQAAAAAG4AUAAAAABxwEBAAAAAdkBAQAAAAHbAQEAAAAB3QEAAADdAQLeAQIAAAAB3wECAAAAAeABQAAAAAHhAUAAAAAB4gFAAAAAAQIAAAAiACAfAADbBAAgAwAAACAAIB8AANsEACAgAADfBAAgEQAAACAAIAQAAI0DACAGAAC_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-JQBBJgBCNwA_OABAAAAAAAAFCAA-JQBBJgBCNwA_OABAAQEAAgEBAAIDCABHJQBIJgBJAAAAAwgARyUASCYASQMGAAIKAAQMAAYDBgACCgAEDAAGBQgATiUAUSYAUjcATzgAUAAAAAAABQgATiUAUSYAUjcATzgAUAAAAwgAVyUAWCYAWQAAAAMIAFclAFgmAFkTAgEULgEVMAEWMQEXMgEZNAEaNhEbNxIcOQEdOxEePBMhPQEiPgEjPxEnQhQoQxgpRAwqRQwrRgwsRwwtSAwuSgwvTBEwTRkxTwwyUREzUho0Uww1VAw2VRE5WBs6WSE7WwU8XAU9XwU-YAU_YQVAYwVBZRFCZiJDaAVEahFFayNGbAVHbQVIbhFJcSRKcihLcwRMdARNdQROdgRPdwRQeQRRexFSfClTfgRUgAERVYEBKlaCAQRXgwEEWIQBEVmHAStaiAExW4kBB1yKAQddiwEHXowBB1-NAQdgjwEHYZEBEWKSATJjlAEHZJYBEWWXATNmmAEHZ5kBB2iaARFpnQE0ap4BOmufAQZsoAEGbaEBBm6iAQZvowEGcKUBBnGnARFyqAE7c6oBBnSsARF1rQE8dq4BBnevAQZ4sAERebMBPXq0AUN7tgEDfLcBA325AQN-ugEDf7sBA4ABvQEDgQG_ARGCAcABRIMBwgEDhAHEARGFAcUBRYYBxgEDhwHHAQOIAcgBEYkBywFGigHMAUqLAc0BCYwBzgEJjQHPAQmOAdABCY8B0QEJkAHTAQmRAdUBEZIB1gFLkwHYAQmUAdoBEZUB2wFMlgHcAQmXAd0BCZgB3gERmQHhAU2aAeIBU5sB5AECnAHlAQKdAegBAp4B6QECnwHqAQKgAewBAqEB7gERogHvAVSjAfEBAqQB8wERpQH0AVWmAfUBAqcB9gECqAH3ARGpAfoBVqoB-wFa"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  CartItemScalarFieldEnum: () => CartItemScalarFieldEnum,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealsScalarFieldEnum: () => MealsScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewsScalarFieldEnum: () => ReviewsScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.6.0",
  engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Cart: "Cart",
  CartItem: "CartItem",
  Category: "Category",
  Meals: "Meals",
  Order: "Order",
  OrderItem: "OrderItem",
  ProviderProfile: "ProviderProfile",
  Reviews: "Reviews",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var CartScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartItemScalarFieldEnum = {
  id: "id",
  cartId: "cartId",
  mealId: "mealId",
  quantity: "quantity"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  logo: "logo",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MealsScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  price: "price",
  imageURL: "imageURL",
  isAvailable: "isAvailable",
  dietary_preferences: "dietary_preferences",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  providerId: "providerId",
  categoryId: "categoryId"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  providerId: "providerId",
  status: "status",
  deliveryAddress: "deliveryAddress",
  paymentMethod: "paymentMethod",
  deliveryCharge: "deliveryCharge",
  totalAmount: "totalAmount",
  placedAt: "placedAt",
  cancelledAt: "cancelledAt",
  deliveredAt: "deliveredAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  mealId: "mealId",
  categoryId: "categoryId",
  quantity: "quantity",
  unitPrice: "unitPrice"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  businessName: "businessName",
  businessSubtitle: "businessSubtitle",
  businessPhone: "businessPhone",
  businessAdress: "businessAdress",
  description: "description",
  city: "city",
  businessLogo: "businessLogo",
  isOpen: "isOpen",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewsScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  mealId: "mealId",
  orderItemId: "orderItemId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  role: "role",
  status: "status",
  phone: "phone",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var registerUser = async (payload) => {
  const hashedPass = await bcrypt.hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPass
    }
  });
  return result;
};
var loginUser = async (payload) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });
  if (!user) {
    throw new Error("User not found!");
  }
  const matchPassword = await bcrypt.compare(payload.password, user.password);
  if (!matchPassword) throw new Error("Invalid Password!");
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
  return { user, token };
};
var getCurrentUser = async (userId) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, status: true, phone: true }
  });
  return result;
};
var authService = {
  registerUser,
  loginUser,
  getCurrentUser
};

// src/utils/sendResponse.ts
var sendResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};
var sendResponse_default = sendResponse;

// src/modules/auth/auth.controller.ts
var registerUser2 = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: "User registration successfull!",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var loginUser2 = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict"
    });
    return sendResponse_default(res, 200, "Login successfull!", result);
  } catch (error) {
    next(error);
  }
};
var getCurrentUser2 = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await authService.getCurrentUser(userId);
    return sendResponse_default(res, 200, "User data retrieved.", result);
  } catch (error) {
    next(error);
  }
};
var authController = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  getCurrentUser: getCurrentUser2
};

// src/middlewares/auth.ts
import jwt2 from "jsonwebtoken";

// src/utils/sendError.ts
var sendError = (res, statusCode, message, error) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...error && { error: error.message }
  });
};
var sendError_default = sendError;

// src/middlewares/auth.ts
var auth = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return sendError_default(res, 401, "Unauthorized Access! Invalid token provided");
      }
      const decode = jwt2.verify(token, process.env.JWT_SECRET_KEY);
      if (!decode) throw new Error("Forbidden!");
      const userData = await prisma.user.findUnique({
        where: {
          email: decode.email
        }
      });
      if (!userData) {
        return sendError_default(res, 401, "Unauthorized Access! User does not exist!");
      }
      if (userData.status === "SUSPENDED") {
        return sendError_default(res, 403, "Forbidden Access! This account is suspended!");
      }
      req.user = decode;
      if (roles.length && !roles.includes(req.user.role))
        return sendError_default(res, 403, "Forbidden! Only for Authorized User");
      next();
    } catch (error) {
      return sendError_default(res, 401, "Invalid or Expired Token");
    }
  };
};
var auth_default = auth;

// src/modules/auth/auth.routes.ts
var router = Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", auth_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), authController.getCurrentUser);
var authRoutes = router;

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err.message || err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "It looks like some of the information you entered is incorrect. Please check your inputs and try again.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "The item you are trying to update or access does not exist. Please check and try again.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error. This entry already exists. Please try a different value.";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Unexpected issue. Please try again later.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your credentials.";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Cannot reach the database server. Try again later.";
    }
  }
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/modules/provider/provider.routes.ts
import { Router as Router2 } from "express";

// src/utils/providerProfileFinder.ts
var providerProfileFinder = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId
    },
    select: {
      id: true
    }
  });
  if (!provider) {
    return false;
  }
  return provider;
};

// src/modules/provider/provider.service.ts
var createProfile = async (data, userId) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error("Provider profile already exists");
  }
  const result = await prisma.providerProfile.create({
    data: {
      ...data,
      userId
    }
  });
  return result;
};
var getProviderProfile = async (providerId) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id: providerId
    }
  });
  return result;
};
var getAllProviders = async () => {
  const result = await prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          status: true
        }
      },
      _count: {
        select: {
          meals: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getProviderByIdPublic = async (providerId) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id: providerId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          status: true
        }
      },
      meals: {
        include: {
          category: true,
          _count: {
            select: {
              reviews: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      },
      _count: {
        select: {
          meals: true,
          orders: true
        }
      }
    }
  });
  if (!result) {
    throw new Error("Provider not found.");
  }
  return result;
};
var createMeals = async (data, userId) => {
  const provider = await providerProfileFinder(userId);
  if (!provider) {
    throw new Error("Provider profile not found. First create a provider profile.");
  }
  const result = await prisma.meals.create({
    data: {
      ...data,
      providerId: provider.id
    }
  });
  console.log(result);
  return result;
};
var getProviderAllMeals = async (providerId) => {
  const result = await prisma.meals.findMany({
    where: {
      providerId
    },
    include: {
      category: true,
      reviews: {
        include: {
          customer: {
            select: {
              name: true
            }
          }
        }
      },
      _count: {
        select: {
          orderItems: true,
          reviews: true
        }
      }
    }
  });
  return result;
};
var getProviderSingleMeal = async (providerId, mealId) => {
  const result = await prisma.meals.findUnique({
    where: {
      id: mealId,
      providerId
    },
    include: {
      category: true,
      reviews: {
        include: {
          customer: {
            select: {
              name: true
            }
          }
        }
      },
      _count: {
        select: {
          orderItems: true,
          reviews: true
        }
      }
    }
  });
  return result;
};
var updateMeals = async (data, mealId) => {
  console.log(data);
  const result = await prisma.meals.update({
    where: {
      id: mealId
    },
    data
  });
  return result;
};
var deleteMeal = async (mealId) => {
  console.log(mealId);
  const hasOrder = await prisma.orderItem.findFirst({
    where: {
      mealId
    }
  });
  if (hasOrder) {
    const result2 = await prisma.meals.update({
      where: {
        id: mealId
      },
      data: {
        isAvailable: false
      }
    });
    return result2;
  }
  const result = await prisma.meals.delete({
    where: {
      id: mealId
    }
  });
  return result;
};
var viewIncomingOrders = async (providerId) => {
  const orderIds_with_placed = await prisma.order.findMany({
    where: {
      providerId,
      status: "PLACED"
    },
    select: {
      id: true
    }
  });
  console.log(orderIds_with_placed);
  const orderIds = orderIds_with_placed.map((order) => order.id);
  const result = await prisma.orderItem.findMany({
    where: {
      orderId: {
        in: orderIds
      }
    },
    include: {
      meal: {
        select: {
          title: true
        }
      },
      order: {
        select: {
          customer: {
            select: {
              name: true,
              phone: true
            }
          }
        }
      }
    }
  });
  return {
    totalOrder: result.length,
    result
  };
};
var getAllOrders = async (providerId) => {
  const allorderIds = await prisma.order.findMany({
    where: {
      providerId
    },
    select: {
      id: true
    }
  });
  console.log(allorderIds);
  const orderIds = allorderIds.map((order) => order.id);
  const result = await prisma.order.findMany({
    where: {
      id: {
        in: orderIds
      }
    },
    include: {
      customer: {
        select: {
          name: true,
          phone: true
        }
      },
      orderItems: {
        select: {
          quantity: true,
          unitPrice: true,
          meal: {
            select: {
              title: true,
              price: true
            }
          }
        }
      },
      _count: {
        select: {
          orderItems: true
        }
      }
    }
  });
  return {
    totalOrder: result.length,
    result
  };
};
var updateOrderStatus = async (orderId, status, providerId) => {
  const orderData = await prisma.order.findUnique({
    where: {
      id: orderId,
      providerId
    }
  });
  if (!orderData) {
    throw new Error("Order not found or this is not your order data");
  }
  const result = await prisma.order.update({
    where: { id: orderId, providerId },
    data: {
      status
    }
  });
  return result;
};
var providerService = {
  createProfile,
  getAllProviders,
  getProviderProfile,
  getProviderByIdPublic,
  createMeals,
  getProviderAllMeals,
  getProviderSingleMeal,
  updateMeals,
  deleteMeal,
  viewIncomingOrders,
  updateOrderStatus,
  getAllOrders
};

// src/utils/provider_validation.ts
var isProviderAndActive = (user) => {
  if (!user) {
    return { ok: false, code: 401, message: "Unauthorized access." };
  }
  if (user.role !== "PROVIDER" /* PROVIDER */) {
    return { ok: false, code: 403, message: "Forbidden! Only providers can access this resource." };
  }
  if (user.status !== "ACTIVE") {
    return { ok: false, code: 403, message: "Your account is not active." };
  }
  return { ok: true };
};

// src/modules/provider/mealFinderFunction.ts
var mealFinderFunction = async (mealId) => {
  const existingMeal = await prisma.meals.findUnique({
    where: {
      id: mealId
    },
    select: {
      providerId: true
    }
  });
  return existingMeal;
};

// src/modules/provider/provider.controller.ts
var createProfile2 = async (req, res) => {
  try {
    const check = isProviderAndActive(req.user);
    if (!check.ok) {
      return sendError_default(res, check.code, check.message);
    }
    const result = await providerService.createProfile(req.body, req.user.id);
    return sendResponse_default(res, 201, "Your provider profile is created successfully.", result);
  } catch (error) {
    return sendError_default(res, 400, "Provider Profile creation failed!!", error);
  }
};
var getProviderProfile2 = async (req, res) => {
  try {
    const check = isProviderAndActive(req.user);
    if (!check.ok) {
      return sendError_default(res, check.code, check.message);
    }
    const userId = req.user.id;
    const provider = await providerProfileFinder(userId);
    if (!provider) {
      return sendError_default(res, 404, "Provider profile not found");
    }
    const result = await providerService.getProviderProfile(provider.id);
    return sendResponse_default(res, 200, "Providers data fetched successfully!", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetched providers data", error.message);
  }
};
var getAllProviders2 = async (req, res) => {
  try {
    const result = await providerService.getAllProviders();
    return sendResponse_default(res, 200, "Providers data fetched successfully!", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetched providers data", error.message);
  }
};
var getProviderByIdPublic2 = async (req, res) => {
  try {
    const providerId = req.params.id;
    if (!providerId) {
      throw new Error("Provider Id not found.");
    }
    const result = await providerService.getProviderByIdPublic(providerId);
    return sendResponse_default(res, 200, "Provider data fetched successfully.", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetched provider data", error.message);
  }
};
var createMeals2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await providerService.createMeals(req.body, userId);
    return sendResponse_default(res, 200, "Meals added to your profile.", result);
  } catch (error) {
    return sendError_default(res, 400, "Meals creation failed!!", error);
  }
};
var getProviderAllMeals2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const provider = await providerProfileFinder(userId);
    if (!provider) {
      return sendError_default(res, 404, "Provider profile not found");
    }
    const result = await providerService.getProviderAllMeals(provider.id);
    return sendResponse_default(res, 200, "Meals data fetched.", result);
  } catch (error) {
    return sendError_default(res, 400, "Could not fetched meals data", error);
  }
};
var getProviderSingleMeal2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const provider = await providerProfileFinder(userId);
    if (!provider) {
      return sendError_default(res, 404, "Provider profile not found");
    }
    const mealId = req.params.id;
    const result = await providerService.getProviderSingleMeal(provider.id, mealId);
    return sendResponse_default(res, 200, "Meal data fetched.", result);
  } catch (error) {
    return sendError_default(res, 400, "Could not fetched meal data", error);
  }
};
var updateMeals2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const mealId = req.params.id;
    const provider = await providerProfileFinder(userId);
    if (!provider) {
      return sendError_default(res, 404, "Provider profile not found");
    }
    const existingMeal = await mealFinderFunction(mealId);
    if (!existingMeal) {
      return sendError_default(res, 404, "Meal not found");
    }
    if (provider.id !== existingMeal.providerId) {
      return sendError_default(res, 403, "Forbidden Access!!! You are not the owner.");
    }
    const result = await providerService.updateMeals(req.body, mealId);
    return sendResponse_default(res, 200, "Meals updated.", result);
  } catch (error) {
    return sendError_default(res, 400, "Could not update meals data", error);
  }
};
var deleteMeals = async (req, res) => {
  try {
    const userId = req.user.id;
    const mealId = req.params.id;
    const provider = await providerProfileFinder(userId);
    if (!provider) {
      return sendError_default(res, 404, "Provider profile not found");
    }
    const existingMeal = await mealFinderFunction(mealId);
    if (!existingMeal) {
      return sendError_default(res, 404, "Meal not found");
    }
    if (provider.id !== existingMeal.providerId) {
      return sendError_default(res, 403, "Forbidden Access!!! You are not the owner.");
    }
    const result = await providerService.deleteMeal(mealId);
    return sendResponse_default(res, 200, "Meal deleted successfully", result);
  } catch (error) {
    sendError_default(res, 400, "Failed to delete meal", error);
  }
};
var viewIncomingOrders2 = async (req, res) => {
  try {
    const isRoleProvider = isProviderAndActive(req.user);
    if (!isRoleProvider.ok) {
      throw new Error(isRoleProvider.message);
    }
    const haveProviderProfile = await providerProfileFinder(req.user.id);
    if (!haveProviderProfile) {
      throw new Error("You do not have any provder profile.First create a profile");
    }
    const providerId = haveProviderProfile.id;
    const result = await providerService.viewIncomingOrders(providerId);
    return sendResponse_default(res, 200, "Incoming Order data fetched", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not get Incoming order data", error);
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const isRoleProvider = isProviderAndActive(req.user);
    if (!isRoleProvider.ok) {
      throw new Error(isRoleProvider.message);
    }
    const haveProviderProfile = await providerProfileFinder(req.user.id);
    if (!haveProviderProfile) {
      throw new Error("You do not have any provder profile.First create a profile");
    }
    const providerId = haveProviderProfile.id;
    const result = await providerService.getAllOrders(providerId);
    return sendResponse_default(res, 200, "Incoming Order data fetched", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not get Incoming order data", error);
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const isRoleProvider = isProviderAndActive(req.user);
    if (!isRoleProvider.ok) {
      throw new Error(isRoleProvider.message);
    }
    const haveProviderProfile = await providerProfileFinder(req.user.id);
    if (!haveProviderProfile) {
      throw new Error("You do not have any provder profile.First create a profile");
    }
    const providerId = haveProviderProfile.id;
    const { status } = req.body;
    const orderId = req.params.id;
    if (!status || !["PLACED", "PREPARING", "READY", "DELIVERED", "CANCELLED"].includes(status)) {
      return sendError_default(res, 400, "Invalid status provided. Allowed values: PLACED,PREPARING, READY, DELIVERED, CANCELLED", "Check your 'status' value.");
    }
    const result = await providerService.updateOrderStatus(orderId, status, providerId);
    return sendResponse_default(res, 201, "Order Status updated", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not update order status", error);
  }
};
var providerController = {
  createProfile: createProfile2,
  getProviderProfile: getProviderProfile2,
  getAllProviders: getAllProviders2,
  getProviderByIdPublic: getProviderByIdPublic2,
  createMeals: createMeals2,
  getProviderAllMeals: getProviderAllMeals2,
  getProviderSingleMeal: getProviderSingleMeal2,
  updateMeals: updateMeals2,
  deleteMeals,
  viewIncomingOrders: viewIncomingOrders2,
  updateOrderStatus: updateOrderStatus2,
  getAllOrders: getAllOrders2
};

// src/modules/provider/provider.routes.ts
var router2 = Router2();
router2.get("/me", auth_default("PROVIDER" /* PROVIDER */), providerController.getProviderProfile);
router2.get("/", providerController.getAllProviders);
router2.get("/:id", providerController.getProviderByIdPublic);
router2.post("/providerProfile", auth_default("PROVIDER" /* PROVIDER */), providerController.createProfile);
router2.get("/menu/meals", auth_default("PROVIDER" /* PROVIDER */), providerController.getProviderAllMeals);
router2.get("/menu/meals/:id", auth_default("PROVIDER" /* PROVIDER */), providerController.getProviderSingleMeal);
router2.post("/menu/meals", auth_default("PROVIDER" /* PROVIDER */), providerController.createMeals);
router2.put("/menu/meals/:id", auth_default("PROVIDER" /* PROVIDER */), providerController.updateMeals);
router2.delete("/menu/meals/:id", auth_default("PROVIDER" /* PROVIDER */), providerController.deleteMeals);
router2.get("/provider-orders/incomingOrders", auth_default("PROVIDER" /* PROVIDER */), providerController.viewIncomingOrders);
router2.get("/provider-orders/all-orders", auth_default("PROVIDER" /* PROVIDER */), providerController.getAllOrders);
router2.patch("/provider-orders/orders/:id", auth_default("PROVIDER" /* PROVIDER */), providerController.updateOrderStatus);
var providerRoutes = router2;

// src/modules/admin/admin.routes.ts
import { Router as Router3 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER"
    },
    select: {
      id: true,
      name: true,
      phone: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      _count: {
        select: {
          orders: true
        }
      }
    }
  });
  const providers = await prisma.user.findMany({
    where: {
      role: "PROVIDER"
    },
    select: {
      id: true,
      name: true,
      phone: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      providerProfiles: {
        select: {
          _count: {
            select: {
              meals: true
            }
          }
        }
      }
    }
  });
  return {
    customers,
    providers
  };
};
var updateUserStatus = async (userId, status) => {
  const existingOrder = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: {
        not: "DELIVERED"
      }
    }
  });
  if (existingOrder && status === "SUSPENDED") {
    throw new Error("This customer has orders that are not delivered yet. You can suspend the customer after order completed.");
  }
  const result = await prisma.user.update({
    where: { id: userId },
    data: { status }
  });
  return result;
};
var getAllOrders3 = async () => {
  const result = await prisma.order.findMany({
    include: {
      _count: {
        select: {
          orderItems: true
        }
      },
      customer: {
        select: {
          name: true,
          phone: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var createCategory = async (categoryName, slug, description, logo) => {
  const existingCategory = await prisma.category.findUnique({
    where: { name: categoryName }
  });
  if (existingCategory) {
    throw new Error(`${categoryName} category is already existed`);
  }
  const result = await prisma.category.create({
    data: {
      name: categoryName,
      slug: slug ?? "",
      description: description ?? "",
      logo: logo ?? ""
    }
  });
  return result;
};
var updateCategory = async (categoryId, categoryName, slug, description, logo) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId }
  });
  if (!existingCategory) {
    throw new Error("Category Not Found");
  }
  const result = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: categoryName,
      slug: slug ?? "",
      description: description ?? "",
      logo: logo ?? ""
    }
  });
  return result;
};
var deleteCategory = async (categoryId) => {
  const result = await prisma.category.delete({
    where: { id: categoryId }
  });
  return result;
};
var adminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders: getAllOrders3,
  createCategory,
  updateCategory,
  deleteCategory
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN" /* ADMIN */) {
      return sendError_default(res, 403, "Forbidden Access!! Only for Admin.");
    }
    const result = await adminService.getAllUsers();
    return sendResponse_default(res, 200, "Both customer and provider data fetched!", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetched users data", error);
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN" /* ADMIN */) {
      return sendError_default(res, 403, "Forbidden Access!! Only for Admin.");
    }
    const userId = req.params.id;
    const { status } = req.body;
    if (!status || !["ACTIVE", "SUSPENDED"].includes(status)) {
      return sendError_default(res, 400, "Invalid status. Allowed values: ACTIVE, SUSPENDED");
    }
    const result = await adminService.updateUserStatus(userId, status);
    return sendResponse_default(res, 200, "User status updated", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not update user status", error);
  }
};
var getAllOrders4 = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN" /* ADMIN */) {
      return sendError_default(res, 403, "Forbidden Access!! Only for Admin.");
    }
    const result = await adminService.getAllOrders();
    return sendResponse_default(res, 200, "Orders fetched successfully", result);
  } catch (error) {
    console.error(error);
    return sendError_default(res, 500, "Failed to fetch orders", error);
  }
};
var createCategory2 = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN" /* ADMIN */) {
      return sendError_default(res, 403, "Forbidden Access!! Only for Admin.");
    }
    const { name, slug, description, logo } = req.body;
    if (!name) {
      return sendError_default(res, 400, "Category name is required");
    }
    const result = await adminService.createCategory(name.toUpperCase(), slug, description, logo);
    return sendResponse_default(res, 201, "Categoyy created successfully", result);
  } catch (error) {
    console.error(error);
    return sendError_default(res, 500, "Failed to create", error);
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, slug, description, logo } = req.body;
    if (!name) {
      return sendError_default(res, 400, "Category name is required");
    }
    const result = await adminService.updateCategory(categoryId, name.toUpperCase(), slug, description, logo);
    return sendResponse_default(res, 200, "Category updated successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Failed to update category", error);
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const result = await adminService.deleteCategory(categoryId);
    return sendResponse_default(res, 200, "Category deleted.", result);
  } catch (error) {
    return sendError_default(res, 500, "Failed to delete category", error);
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  getAllOrders: getAllOrders4,
  createCategory: createCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/admin/admin.routes.ts
var router3 = Router3();
router3.get("/users", auth_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
router3.patch("/update-status/users/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateUserStatus);
router3.get("/orders", auth_default("ADMIN" /* ADMIN */), adminController.getAllOrders);
router3.post("/categories", auth_default("ADMIN" /* ADMIN */), adminController.createCategory);
router3.patch("/categories/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateCategory);
router3.delete("/categories/:id", auth_default("ADMIN" /* ADMIN */), adminController.deleteCategory);
var adminRoutes = router3;

// src/modules/cart/cart.routes.ts
import { Router as Router4 } from "express";

// src/modules/cart/cart.service.ts
var addToCart = async (userId, mealId, quantity) => {
  const mealData = await prisma.meals.findUnique({
    where: { id: mealId }
  });
  if (!mealData) {
    throw new Error("Meal not found");
  }
  if (!mealData.isAvailable) {
    throw new Error("Meal Unavailable. Please order another meal.");
  }
  let userCartData = await prisma.cart.findUnique({
    where: { customerId: userId }
  });
  if (!userCartData) {
    userCartData = await prisma.cart.create({
      data: {
        customerId: userId
      }
    });
  }
  const existignItem = await prisma.cartItem.findUnique({
    where: {
      cartId_mealId: {
        cartId: userCartData.id,
        mealId
      }
    }
  });
  if (existignItem) {
    const result2 = await prisma.cartItem.update({
      where: {
        id: existignItem.id
      },
      data: {
        quantity: existignItem.quantity + Number(quantity)
      }
    });
    return result2;
  }
  const result = await prisma.cartItem.create({
    data: {
      cartId: userCartData.id,
      mealId,
      quantity: Number(quantity)
    }
  });
  return result;
};
var getMyCart = async (userId) => {
  const result = await prisma.cart.findUnique({
    where: {
      customerId: userId
    },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              title: true,
              price: true,
              category: {
                select: {
                  name: true
                }
              },
              provider: {
                select: {
                  id: true,
                  businessName: true
                }
              }
            }
          }
        }
      }
    }
  });
  return result;
};
var updateCartItem = async (cartItemId, userId, newQuantity) => {
  const cartItemData = await prisma.cartItem.findUnique({
    where: {
      id: cartItemId
    },
    select: {
      cart: {
        select: {
          customerId: true
        }
      }
    }
  });
  if (cartItemData?.cart.customerId !== userId) {
    throw new Error("Forbidden Access! This is not your cartItem");
  }
  const result = await prisma.cartItem.update({
    where: {
      id: cartItemId
    },
    data: {
      quantity: newQuantity
    }
  });
  return result;
};
var removeCartItem = async (cartItemId, userId) => {
  const cartItemData = await prisma.cartItem.findUnique({
    where: {
      id: cartItemId
    },
    select: {
      cart: {
        select: {
          customerId: true
        }
      }
    }
  });
  if (cartItemData?.cart.customerId !== userId) {
    throw new Error("Forbidden Access! This is not your cartItem");
  }
  const result = await prisma.cartItem.delete({
    where: {
      id: cartItemId
    }
  });
  return result;
};
var clearCartData = async (userId) => {
  const cartData = await prisma.cart.findUnique({
    where: {
      customerId: userId
    }
  });
  if (!cartData) {
    throw new Error("Cart is empty.");
  }
  const result = await prisma.cart.delete({
    where: {
      customerId: userId
    }
  });
  return result;
};
var cartService = {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCartData
};

// src/modules/cart/cart.controller.ts
var addToCart2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mealId, quantity } = req.body;
    if (!mealId || !quantity || quantity < 1) {
      throw new Error("mealId and valid quantity are required");
    }
    const result = await cartService.addToCart(userId, mealId, quantity);
    return sendResponse_default(res, 201, "Item add to the cart successfully.", result);
  } catch (error) {
    return sendError_default(res, 500, "Failed to add item to the cart!", error.message);
  }
};
var getMyCart2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("userId not found. you are not logged in");
    }
    const result = await cartService.getMyCart(userId);
    return sendResponse_default(res, 200, "Cart data fecthed successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetched cart data", error);
  }
};
var updateCartItem2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("userId not found. you are not logged in");
    }
    const cartItemId = req.params.id;
    const newQuantity = req.body.quantity;
    const result = await cartService.updateCartItem(cartItemId, userId, newQuantity);
    return sendResponse_default(res, 200, "Cart data updated successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not update cart data", error);
  }
};
var removeCartItem2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("userId not found. you are not logged in");
    }
    const cartItemId = req.params.id;
    const result = await cartService.removeCartItem(cartItemId, userId);
    return sendResponse_default(res, 200, "Cart data removed successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not remove cart data", error);
  }
};
var clearCartData2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("userId not found. you are not logged in");
    }
    const result = await cartService.clearCartData(userId);
    return sendResponse_default(res, 200, "Cart data cleared", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not clear cart data", error);
  }
};
var cartController = {
  addToCart: addToCart2,
  getMyCart: getMyCart2,
  updateCartItem: updateCartItem2,
  removeCartItem: removeCartItem2,
  clearCartData: clearCartData2
};

// src/modules/cart/cart.routes.ts
var router4 = Router4();
router4.get("/", auth_default("CUSTOMER" /* CUSTOMER */), cartController.getMyCart);
router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), cartController.addToCart);
router4.patch("/items/:id", auth_default("CUSTOMER" /* CUSTOMER */), cartController.updateCartItem);
router4.delete("/items/:id", auth_default("CUSTOMER" /* CUSTOMER */), cartController.removeCartItem);
router4.delete("/", auth_default("CUSTOMER" /* CUSTOMER */), cartController.clearCartData);
var cartRoutes = router4;

// src/modules/order/order.routes.ts
import { Router as Router5 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (userId, deliveryAddress) => {
  const cartData = await prisma.cart.findUnique({
    where: { customerId: userId },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              price: true,
              providerId: true,
              categoryId: true
            }
          }
        }
      }
    }
  });
  if (!cartData || cartData.items.length === 0) {
    throw new Error("Cart is empty.");
  }
  const cartItems = cartData.items;
  const result = [];
  for (const item of cartItems) {
    const providerId = item.meal.providerId;
    const providerItems = cartItems.filter((itm) => itm.meal.providerId === providerId);
    const totalAmount = providerItems.reduce((total, itm) => total + itm.quantity * itm.meal.price, 0);
    const newOrder = await prisma.order.create({
      data: {
        customerId: userId,
        deliveryAddress,
        totalAmount,
        providerId
      }
    });
    for (const item2 of providerItems) {
      await prisma.orderItem.create({
        data: {
          orderId: newOrder.id,
          mealId: item2.meal.id,
          categoryId: item2.meal.categoryId,
          quantity: item2.quantity,
          unitPrice: item2.meal.price
        }
      });
    }
    result.push(newOrder);
  }
  await prisma.cartItem.deleteMany({
    where: {
      cartId: cartData.id
    }
  });
  return result;
};
var getMyOrders = async (userId) => {
  const result = await prisma.order.findMany({
    where: {
      customerId: userId
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getMyOrderById = async (userId, orderId) => {
  const result = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId: userId
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });
  if (!result) {
    throw new Error("Order not found");
  }
  return result;
};
var orderService = {
  createOrder,
  getMyOrders,
  getMyOrderById
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("user id not found or you are not logged in");
    }
    const { deliveryAddress } = req.body;
    if (!deliveryAddress) {
      throw new Error("Delivery address is required");
    }
    const result = await orderService.createOrder(userId, deliveryAddress);
    return sendResponse_default(res, 201, "Order placed successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Failed to place order", error);
  }
};
var getMyOrders2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("You are not logged in. Logged in first");
    }
    const result = await orderService.getMyOrders(userId);
    return sendResponse_default(res, 200, "order data fetched successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not get orders data", error);
  }
};
var getMyOrderById2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    if (!userId) {
      throw new Error("You are not logged in. Logged in first");
    }
    const result = await orderService.getMyOrderById(userId, orderId);
    return sendResponse_default(res, 200, "order data fetched successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not get orders data", error);
  }
};
var orderController = {
  createOrder: createOrder2,
  getMyOrders: getMyOrders2,
  getMyOrderById: getMyOrderById2
};

// src/modules/order/order.routes.ts
var router5 = Router5();
router5.get("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getMyOrders);
router5.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getMyOrderById);
router5.post("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
var orderRoutes = router5;

// src/modules/reviews/reviews.routes.ts
import { Router as Router6 } from "express";

// src/modules/reviews/reviews.service.ts
var createReview = async ({ userId, orderItemId, mealId, rating, comment }) => {
  const orderData = await prisma.orderItem.findUnique({
    where: {
      id: orderItemId
    },
    select: {
      orderId: true
    }
  });
  if (!orderData)
    throw new Error("There is nor order.");
  const isDelivered = await prisma.order.findUnique({
    where: {
      id: orderData?.orderId,
      status: "DELIVERED"
    }
  });
  if (!isDelivered) {
    throw new Error("The order is not delivered yet");
  }
  if (isDelivered?.customerId !== userId) {
    throw new Error("Forbidden! You can only reviews in your own ordred meals");
  }
  const review = await prisma.reviews.create({
    data: {
      customerId: userId,
      mealId,
      orderItemId,
      rating,
      comment: comment ?? ""
    }
  });
  return review;
};
var getMyAllReviews = async ({ userId }) => {
  const result = await prisma.reviews.findMany({
    where: {
      customerId: userId
    },
    include: {
      meal: {
        select: {
          title: true
        }
      }
    }
  });
  return result;
};
var reviewsService = {
  createReview,
  getMyAllReviews
};

// src/modules/reviews/reviews.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("Your are not logged in.");
    }
    const { orderItemId, mealId, rating, comment } = req.body;
    if (!mealId) {
      throw new Error("mealId and rating is required");
    }
    if (!rating) {
      throw new Error("rating is required");
    }
    const result = await reviewsService.createReview({ userId, orderItemId, mealId, rating, comment });
    return sendResponse_default(res, 201, "review added", result);
  } catch (error) {
    return sendError_default(res, 500, "Failded to add review", error);
  }
};
var getMyAllReviews2 = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new Error("Your are not logged in.");
    }
    const result = await reviewsService.getMyAllReviews({ userId });
    return sendResponse_default(res, 200, "reviews fetched", result);
  } catch (error) {
    return sendError_default(res, 500, "Failded to fetched reviews", error);
  }
};
var reviewsController = {
  createReview: createReview2,
  getMyAllReviews: getMyAllReviews2
};

// src/modules/reviews/reviews.routes.ts
var router6 = Router6();
router6.get("/", auth_default("CUSTOMER" /* CUSTOMER */), reviewsController.getMyAllReviews);
router6.post("/", auth_default("CUSTOMER" /* CUSTOMER */), reviewsController.createReview);
var reviewsRoutes = router6;

// src/modules/customer/customer.routes.ts
import { Router as Router7 } from "express";

// src/modules/customer/customer.service.ts
import bcrypt2 from "bcryptjs";
var getProfile = async (userId) => {
  if (!userId) {
    throw new Error("Invalid userid");
  }
  const result = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!result) {
    throw new Error("Customer data not found");
  }
  return result;
};
var updateProfile = async ({
  userId,
  name,
  phone,
  currentPassword,
  newPassword
}) => {
  const dataToUpdate = {};
  if (name !== void 0) dataToUpdate.name = name;
  if (phone !== void 0) dataToUpdate.phone = phone;
  if (currentPassword || newPassword) {
    if (!currentPassword || !newPassword) {
      throw new Error("Current and new password are required.");
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });
    if (!existingUser) {
      throw new Error("User not found!");
    }
    const matchPassword = await bcrypt2.compare(
      currentPassword,
      existingUser.password
    );
    if (!matchPassword) {
      throw new Error("Invalid current password!");
    }
    dataToUpdate.password = await bcrypt2.hash(newPassword, 10);
  }
  const result = await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate
  });
  return result;
};
var cancelOrder = async (userId, orderId) => {
  const orderData = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      orderItems: true
    }
  });
  if (!orderData) {
    throw new Error("Order not found");
  }
  if (orderData.customerId !== userId) {
    throw new Error("You can only cancel your own orders");
  }
  if (!["PLACED", "PREPARING"].includes(orderData.status)) {
    throw new Error("You can only cancel orders that are in 'PLACED' or 'PREPARING' status");
  }
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: "CANCELLED"
    }
  });
  return result;
};
var customerService = {
  getProfile,
  updateProfile,
  cancelOrder
};

// src/modules/customer/customer.controller.ts
var getProfile2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await customerService.getProfile(userId);
    return sendResponse_default(res, 200, "Customer data fetched successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not get profile data", error);
  }
};
var updateProfile2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, currentPassword, newPassword } = req.body;
    if (!name && !phone && !newPassword) {
      return sendError_default(res, 400, "At least one field (name, phone) is required to update");
    }
    const result = await customerService.updateProfile({ userId, name, phone, currentPassword, newPassword });
    return sendResponse_default(res, 200, "Customer data updated", result);
  } catch (error) {
    console.error(error);
    return sendError_default(res, 500, "Failed to update profile", error);
  }
};
var cancelOrder2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    if (!orderId) {
      return sendError_default(res, 400, "Order ID is required");
    }
    const result = await customerService.cancelOrder(userId, orderId);
    return sendResponse_default(res, 200, "Order cancelled successfully", result);
  } catch (error) {
    return sendError_default(res, 500, "Failed to cancel order", error);
  }
};
var customerController = {
  getProfile: getProfile2,
  updateProfile: updateProfile2,
  cancelOrder: cancelOrder2
};

// src/modules/customer/customer.routes.ts
var router7 = Router7();
router7.get("/profile", auth_default("CUSTOMER" /* CUSTOMER */), customerController.getProfile);
router7.put("/profile", auth_default("CUSTOMER" /* CUSTOMER */), customerController.updateProfile);
router7.get("/orders", auth_default("CUSTOMER" /* CUSTOMER */), customerController.cancelOrder);
router7.patch("/orders/cancel/:id", auth_default("CUSTOMER" /* CUSTOMER */), customerController.cancelOrder);
var customerRoutes = router7;

// src/modules/public/public.routes.ts
import { Router as Router8 } from "express";

// src/modules/public/public.service.ts
var getAllCatgeoriesTest = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};
var getAllCatgeories = async (limit) => {
  const categories = await prisma.category.findMany({
    include: {
      orderItems: {
        select: {
          quantity: true
        }
      }
    }
  });
  const sortedCategroties = categories.map((cat) => ({
    ...cat,
    totalOrder: cat.orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  })).sort((a, b) => b.totalOrder - a.totalOrder);
  if (limit && limit !== "undefined") {
    const result = sortedCategroties.slice(0, Number(limit));
    return result;
  }
  return sortedCategroties;
};
var getAllProviders3 = async (limit) => {
  const providersData = await prisma.providerProfile.findMany({
    include: {
      orders: {
        select: {
          _count: {
            select: {
              orderItems: true
            }
          }
        }
      }
    }
  });
  const sortedProviders = providersData.map((provider) => {
    const totalOrderItems = provider.orders.reduce(
      (sum, order) => sum + order._count.orderItems,
      0
    );
    return {
      ...provider,
      totalOrderItems
    };
  }).sort((a, b) => b.totalOrderItems - a.totalOrderItems);
  if (limit && limit !== "undefined") {
    const result = sortedProviders.slice(0, Number(limit));
    return result;
  }
  return sortedProviders;
};
var getTotalOrdersCount = async () => {
  const result = await prisma.order.count();
  return result;
};
var getAllMeals = async ({
  search,
  categoryId,
  dietaryTags,
  minPrice,
  maxPrice,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  console.log(
    "pARAMS",
    search,
    categoryId,
    dietaryTags,
    minPrice,
    maxPrice
  );
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          dietary_preferences: {
            has: search
          }
        }
      ]
    });
  }
  if (categoryId) {
    andConditions.push({
      categoryId
    });
  }
  if (dietaryTags.length > 0) {
    andConditions.push({
      dietary_preferences: {
        hasEvery: dietaryTags
      }
    });
  }
  if (minPrice) {
    andConditions.push({
      price: {
        gte: minPrice ? Number(minPrice) : void 0
      }
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        lte: maxPrice ? Number(maxPrice) : void 0
      }
    });
  }
  const result = await prisma.meals.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      reviews: {
        select: {
          rating: true
        }
      },
      category: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    }
  });
  return result;
};
var getAllMealById = async (id) => {
  const result = await prisma.meals.findUnique({
    where: {
      id
    },
    include: {
      provider: true,
      orderItems: true,
      reviews: true,
      category: true,
      _count: {
        select: {
          reviews: true
        }
      }
    }
  });
  return result;
};
var getDietaryPreferences = async () => {
  const result = await prisma.meals.findMany({
    select: {
      dietary_preferences: true
    }
  });
  const uniqueDietaryPreferences = [
    ...new Set(result.map((item) => item.dietary_preferences).flat())
  ];
  return uniqueDietaryPreferences;
};
var publicService = {
  getAllCatgeoriesTest,
  getAllCatgeories,
  getAllProviders: getAllProviders3,
  getTotalOrdersCount,
  getAllMeals,
  getAllMealById,
  getDietaryPreferences
};

// src/utils/paginationSortinghelpers.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortinghelpers_default = paginationSortingHelper;

// src/modules/public/public.controller.ts
var getAllCatgeoriesTest2 = async (req, res) => {
  try {
    const result = await publicService.getAllCatgeoriesTest();
    return sendResponse_default(res, 200, "category data fecthed", result);
  } catch (error) {
    sendError_default(res, 500, "Could not fetched categories", error);
  }
};
var getAllCatgeories2 = async (req, res) => {
  try {
    const limit = req.query.limit;
    const result = await publicService.getAllCatgeories(limit);
    return sendResponse_default(res, 200, "category data fecthed", result);
  } catch (error) {
    sendError_default(res, 500, "Could not fetched categories", error);
  }
};
var getAllProviders4 = async (req, res) => {
  try {
    const limit = req.query.limit;
    const result = await publicService.getAllProviders(limit);
    return sendResponse_default(res, 200, "Provider data fetched", result);
  } catch (error) {
    sendError_default(res, 500, "Could not fetched providers", error);
  }
};
var getTotalOrdersCount2 = async (req, res) => {
  try {
    const result = await publicService.getTotalOrdersCount();
    return sendResponse_default(res, 200, "Orders count data fetched", result);
  } catch (error) {
    sendError_default(res, 500, "Could not fetched order counts", error);
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const dietaryTags = req.query.dietaryTags ? req.query.dietaryTags.split(",") : [];
    const categoryId = req.query.categoryId;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortinghelpers_default(req.query);
    const result = await publicService.getAllMeals({ search: searchString, categoryId, dietaryTags, minPrice, maxPrice, page, limit, skip, sortBy, sortOrder });
    return sendResponse_default(res, 200, "Meals data fetched successfully.", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetch meals data", error);
  }
};
var getAllMealById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await publicService.getAllMealById(id);
    return sendResponse_default(res, 200, "Meal fetched successfully.", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetch meal data", error);
  }
};
var getDietaryPreferences2 = async (req, res) => {
  try {
    const result = await publicService.getDietaryPreferences();
    return sendResponse_default(res, 200, "Dietary Preferences fetched successfully.", result);
  } catch (error) {
    return sendError_default(res, 500, "Could not fetch dietary data", error);
  }
};
var publicController = {
  getAllCatgeoriesTest: getAllCatgeoriesTest2,
  getAllCatgeories: getAllCatgeories2,
  getAllProviders: getAllProviders4,
  getTotalOrdersCount: getTotalOrdersCount2,
  getAllMeals: getAllMeals2,
  getAllMealById: getAllMealById2,
  getDietaryPreferences: getDietaryPreferences2
};

// src/modules/public/public.routes.ts
var router8 = Router8();
router8.get("/test/categories", publicController.getAllCatgeoriesTest);
router8.get("/categories", publicController.getAllCatgeories);
router8.get("/providers", publicController.getAllProviders);
router8.get("/ordersCount", publicController.getTotalOrdersCount);
router8.get("/meals", publicController.getAllMeals);
router8.get("/meals/:id", publicController.getAllMealById);
router8.get("/dietaryPreferences", publicController.getDietaryPreferences);
var publicRoutes = router8;

// src/app.ts
var app = express8();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  // client side url
  credentials: true
}));
app.use(express8.json());
app.use("/api/auth", authRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(globalErrorHandler_default);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
//! ------------------- Meals Section ------------------------
//! ---------------- Orders Section --------------
//! -------------------- Provider Profiles Routes ------------------
//! -------------------- Provider Meals Routes ------------------
//! ------------- Provider Order routes ----------------- 
