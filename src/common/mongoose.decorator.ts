import { Inject } from "@nestjs/common";
import { getModelToken } from "./mongoose.util";

export const InjectModel = (model: string, connectionName?: string) => Inject(getModelToken(model, connectionName));


