export class CreateRestaurantDto {
    name: string;
    slug: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export class UpdateRestaurantDto {
    name?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    isActive?: boolean;
}
