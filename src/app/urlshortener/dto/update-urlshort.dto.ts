import { PartialType } from "@nestjs/swagger";
import { CreateUrlShortDto } from "./create-urlshort.dto";

export class UpdateUrlShortDto extends PartialType(CreateUrlShortDto) {}