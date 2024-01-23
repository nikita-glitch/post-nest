import { SetMetadata } from "@nestjs/common";

export const IsPublic = (publicRoute: boolean ) => SetMetadata('isPublic', publicRoute)