import { UserType } from "./user";

export interface IDecodedAuthToken {
    nameid: number;
    unique_name: string;
    role: UserType;
    exp: number;
    preferred_username: string;
}

export class DecodedAuthToken implements IDecodedAuthToken {
    nameid: number = 0;
    unique_name: string = '';
    role: UserType = UserType.None;
    exp: number = 0;
    preferred_username: string = '';

    constructor(configOverride?: Partial<IDecodedAuthToken>) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}