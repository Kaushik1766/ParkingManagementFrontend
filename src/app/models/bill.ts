import { ParkingHistory } from "./parking-history";

export interface Bill {
    parking_history: ParkingHistory[];
    total_amount: number;
    bill_date: string;
    user_id: string;
}
