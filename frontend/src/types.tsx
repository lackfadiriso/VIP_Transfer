export interface CreateOrder{
    full_name: string
    phone: string
    pick_up_location: string
    drop_off_location: string
    pick_up_date: string
    passenger_count: number
}

export interface OrderDetail{
    id: number
    full_name: string
    phone: string
    pick_up_location: string
    drop_off_location: string
    pick_up_date: string
    passenger_count: number
    status: string
    created_at: string
}
