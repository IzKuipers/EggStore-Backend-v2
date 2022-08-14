export type EggDB = {[key:string]:EggEntry};

export interface EggEntry {
    amount:number;
    registrar:string;
    timestamp:string;
    id?:string;
}

export function isEggEntry(data:string) {
    let json;

    try {
        json = JSON.parse(data);
    } catch {
        return false;
    }

    json = json as EggEntry;
    
    return json.amount && json.registrar && json.timestamp;
}