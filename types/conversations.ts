import { annonceWithUserInterface } from "./annonce";
import { UserType } from "./users";

export interface ConversationType {
    conversation_id: number;
    annonce: annonceWithUserInterface;
    buyer: UserType;
    created_at: Date;
    messages: Array<{
        message_id: number;
        content: string;
        read_time: Date | null;
        sender: UserType;
        receiver: UserType;
        created_at: Date;
        updated_at: Date;
    }>;
}
