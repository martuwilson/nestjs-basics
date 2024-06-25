import { BadRequestException, Get, Injectable, NotFoundException, Param } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto,UpdateCarDto } from './dto'

@Injectable()
export class CarsService {
  private cars: Car[] = [
    /* {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Nissan',
      model: 'Sentra',
    }, */
  ];

  public findAll() {
    return this.cars;
  }

  public findById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }

  create( CreateCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...CreateCarDto,
    };

    this.cars.push(newCar);

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {

    let carDB = this.findById(id);

    if(updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException(`Car with id ${id} is not valid inside body update`);

    this.cars = this.cars.map( car => {
      if (car.id === id) {
        carDB = {...carDB,...updateCarDto,id};

        return carDB;
      } else {
        return car;
      }
    })

    return carDB;
  }

  delete(id: string) {
    const car = this.findById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
