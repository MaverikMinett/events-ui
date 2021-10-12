
export interface Event {
    id: number;
    name: string;
    description: string;

    time_start: string;
    time_end: string;

    status: string;
}

export interface EventDetail extends Event {
    location_name: string;
    location_address: string;
    contact_phone: string;
    contact_email: string;

    tickets: Ticket[] | undefined
    sessions: Session[] | undefined
}

export interface Ticket {
    id: number;
    label: string;
    status: string;
    description: string;
    price: number;
}

export interface Session {
    id: number;
    label: string;
    status: string;
    description: string;
    price: number;
}

export interface Attendee {
    ticket: number
    first_name: string
    last_name: string
    email: string 
    phone: string 
    company: string
}



