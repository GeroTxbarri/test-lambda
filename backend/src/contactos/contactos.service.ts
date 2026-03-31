import { Injectable } from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactosService {
  constructor(private readonly prisma: PrismaService) { }

  // Crear un contacto con nombre y mail
  async create(createContactoDto: CreateContactoDto) {
    return this.prisma.contact.create({
      data: {
        nombre: createContactoDto.nombre,
        mail: createContactoDto.mail,
      },
    });
  }

  // Listar todos los contactos
  async findAll() {
    return this.prisma.contact.findMany();
  }

  // devuelve un solo contacto por su id
  findOne(id: number) {
    return this.prisma.contact.findUnique({
      where: { id },
    });
  }


  // Eliminar un contacto por la id
  async remove(id: number) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
