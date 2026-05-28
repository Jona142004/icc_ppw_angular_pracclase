export interface SimpsonsResponse {
    count:   number;
    next:    string;
    prev:    null;
    pages:   number;
    results: SimpsonsCharacter[];
}

export interface SimpsonsCharacter {
    id:            number;
    age:           number | null;
    birthdate:     String | null;
    gender:        String;
    name:          string;
    occupation:    string;
    portrait_path: string;
    phrases:       string[];
    status:        String;
}


