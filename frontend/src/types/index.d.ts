export interface Conversation {
    id: number;
    participant: string;
    lastMessage: string;
    timestamp: string;
    avatarUrl: string;
}

export type User = {
    id: number,
    lastname: string,
    firstname: string,
    email: string,
    password: string,
    confirmPassword: string,
    zip_code: string,
    city: string,
    date_of_birth: string,
    description: string,
    status: "en-attente" | "valide" | "bloqué" | "désactivé",
    interests: Interest[],
    events: Event[]
}

export type Event = {
    id: number,
    photo: string,
    name: string,
    start_date: string,
    end_date: string,
    description: string,
    address: string,
    zip_code: string,
    city: string,
    creator_id: number,
    interests: Interest[],
    creator: User,
    users: User[]
}

export type Interest = {
    id: number,
    name: string
}
