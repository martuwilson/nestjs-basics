import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carService: CarsService
    ){}

    @Get()
    getAllCars() {
        return this.carService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4' })) id: string ) {

        return this.carService.findById(id);
    }

    @Post()
    // @UsePipes(ValidationPipe)
    createCar(@Body() createCardDto: CreateCarDto) {
        return createCardDto;
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any)
        {
        return body;
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseIntPipe) id: number
    ) {
        return 'Car deleted';
    }

}
 