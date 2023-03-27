export interface UpdateAccountUseCaseInputDTO {
  id: string
  name?: string
  burth?: Date
  country?: string
  city?: string
  address?: string
  postalCode?: string
  phone?: string
  email?: string
}

export interface UpdateAccountUseCaseOutputDTO {
  id: string
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
  updatedAt: Date
}
