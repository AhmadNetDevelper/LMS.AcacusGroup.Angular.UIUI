export interface SystemNotification {
    Id: Number;
    CreatedBy: Number;
    RecipientId: Number;
    SenderId: Number;
    MessageText: string;
    ReferanceMassageId: Number;
}

export interface Message {
    id: number;
    createBy: number;
    createdDate: Date;
    UpdatedDate: Date;
    UpdatedBy: number;
    senderName?: string;
    SenderPhotoUrl?: string;
    recipientId: number;
    recipientName?: string;
    recipientPhotoUrl?: string;
    messageText: string;
    isRead?: boolean;
    createDate?: Date;
}

export enum State {
    Non,
    View,
    Add,
    Edit,
    Delete,
    Search,
    Print,
    PrintAll,
    Excel,
    ExcelAll,
    Pagination,
    Chatting,
    Check,
    BillDetails,
    Pay,
}

export enum ResultActions {
    Non,
    Added,
    Updated,
    Deleted,
    CancelAdd,
    AlreadyExist,
}

export interface ActionRowGrid {
    type: State;
    row: any;
}

export interface DynamicColumn {
    headerName: string;
    icon: string;
    status: State;
    childColumn?: SubChildrenColumn[];
}
export interface SubChildrenColumn {
    name: string;
    status: State;
}