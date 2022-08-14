import { SchoolSystemAPIEval } from "./server/endpoint/store";
import { makeServer } from "./server/main";

makeServer(2804, "Reggistry v2", SchoolSystemAPIEval);
