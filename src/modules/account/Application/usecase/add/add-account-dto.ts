export interface AddAccountUseCaseInputDTO {
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
}

export interface AddAccountUseCaseOutputDTO {
  id: string
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
  createdAt: Date
  updatedAt: Date
}
