import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateRestaurantDto) {
        return this.prisma.restaurant.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.restaurant.findMany({
            where: { isActive: true },
        });
    }

    async findOne(id: string) {
        return this.prisma.restaurant.findUnique({
            where: { id },
            include: { menus: true },
        });
    }

    async update(id: string, data: UpdateRestaurantDto) {
        return this.prisma.restaurant.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.restaurant.delete({
            where: { id },
        });
    }
}
