import { CommonState } from '../../../modules/types';

export interface EventItem {
    event_id: number;
    event_name: string;
    description: string;
    image_link: string;
    image_mobile_link : string;
    ref_link: string;
    created_at: string;
}


export interface EventsState extends CommonState {
    payload: EventItem[];
    loading: boolean;
}
