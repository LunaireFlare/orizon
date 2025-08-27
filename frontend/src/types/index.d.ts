export interface Conversation {
    id: number;
    participant: string;
    lastMessage: string;
    timestamp: string;
    avatarUrl: string;
}

export type Event = {
    id: number,
    photo: string,
    name: string,
    start_date: string,
    end_date: string,
    address: string,
    city: string,
    zip_code: number,
    description: string,
    creator_id: number,
    interests: Interest[],
    creator: User,
    users: User[]
}