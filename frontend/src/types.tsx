export interface CreateOrder{
    full_name: string
    phone: string
    pick_up_location: string
    drop_off_location: string
    pick_up_date: string
    return_date: string | undefined
    passenger_count: number
}

export interface OrderDetail extends CreateOrder {
    id: number
    status: string
    created_at: string
}

export interface Vehicle {
  id: number
  name: string
  capacity: number
  image: string
}

export interface AboutData {
  about_text: string
  years_experience: number
  happy_customer: string
}
