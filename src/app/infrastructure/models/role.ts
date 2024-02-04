import { UserType } from './user';

export interface IRoleDTO {
    name: UserType;
}

export class RoleDTO implements IRoleDTO {
    name: UserType = UserType.None;

    static isRoleType(role: UserType): role is UserType {
        const roleTypeList: UserType[] = [
            UserType.Admin,
            UserType.Librarian,
            UserType.Member
        ];
        return roleTypeList.includes(role);
    }

    static isAdminRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Admin];
        return typeList.includes(role);
    }

    static isLibrarianRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Librarian];
        return typeList.includes(role);
    }

    static isMemberRoleType(role: UserType): role is UserType {
        const typeList: UserType[] = [UserType.Member];
        return typeList.includes(role);
    }
    static isMatchRoleType(
        role: UserType,
        roleMatch: UserType[],
    ): role is UserType {
        return roleMatch.includes(role);
    }

    constructor(configOverride?: IRoleDTO) {
        if (configOverride) {
            Object.assign(this, configOverride);
        }
    }
}
