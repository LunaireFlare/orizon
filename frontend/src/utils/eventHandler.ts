import type { User } from "../types";

    export const handleEventDelete = (user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>, eventId: number) => {        if (!user) return;
        setUser({
            ...user,
            events: user.events.filter(event => event.id !== eventId)
        });
    };

    export const handleSubscribe = (user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>, eventId: number) => {
        if (!user) return;
        setUser({
            ...user,
            events: user.events.map(event =>
                event.id === eventId
                    ? {
                        ...event,
                        users: [...event.users, { id: user.id, firstname: user.firstname, lastname: user.lastname } as User]
                    }
                    : event
            )
        });
    };

    export const handleUnsubscribe = (user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>, eventId: number) => {
        if (!user) return;
        setUser({
            ...user,
            events: user.events.map(event =>
                event.id === eventId
                    ? { ...event, users: event.users.filter(u => u.id !== user.id) }
                    : event
            )
        });
    };