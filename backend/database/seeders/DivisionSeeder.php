<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            [
                'name' => 'Ventas',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 15,
                'ambassador_name' => 'Juan Pérez'
            ],
            [
                'name' => 'Contabilidad',
                'parent_id' => 1,
                'level' => 2,
                'employee_count' => 8,
                'ambassador_name' => 'María López'
            ],
            [
                'name' => 'Marketing',
                'parent_id' => 1,
                'level' => 2,
                'employee_count' => 12,
                'ambassador_name' => 'Pedro Ramírez'
            ],
            [
                'name' => 'Tecnología',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 20,
                'ambassador_name' => 'José Gómez'
            ],
            [
                'name' => 'Recursos Humanos',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 10,
                'ambassador_name' => 'Laura Sánchez'
            ],
            [
                'name' => 'Producción',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 25,
                'ambassador_name' => 'Miguel Torres'
            ],
            [
                'name' => 'Soporte Técnico',
                'parent_id' => 5,
                'level' => 2,
                'employee_count' => 7,
                'ambassador_name' => 'Diana Martínez'
            ],
            [
                'name' => 'Logística',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 18,
                'ambassador_name' => 'Andrés Jiménez'
            ],
            [
                'name' => 'Atención al Cliente',
                'parent_id' => 4,
                'level' => 2,
                'employee_count' => 5,
                'ambassador_name' => 'Carlos Ruiz'
            ],
            [
                'name' => 'Investigación y Desarrollo',
                'parent_id' => 4,
                'level' => 2,
                'employee_count' => 14,
                'ambassador_name' => 'Ana Gutiérrez'
            ],
            [
                'name' => 'Compras',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 9,
                'ambassador_name' => 'Sofia Delgado'
            ],
            [
                'name' => 'Ventas Internacionales',
                'parent_id' => 1,
                'level' => 2,
                'employee_count' => 6,
                'ambassador_name' => 'Luis Torres'
            ],
            [
                'name' => 'Finanzas',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 12,
                'ambassador_name' => 'Julieta Fernández'
            ],
            [
                'name' => 'Innovación',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 18,
                'ambassador_name' => 'Ricardo Morales'
            ],
            [
                'name' => 'Calidad',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 8,
                'ambassador_name' => 'Patricia Navarro'
            ],
            [
                'name' => 'Logística Internacional',
                'parent_id' => 8,
                'level' => 2,
                'employee_count' => 5,
                'ambassador_name' => 'Esteban Vargas'
            ],
            [
                'name' => 'Publicidad',
                'parent_id' => 3,
                'level' => 2,
                'employee_count' => 10,
                'ambassador_name' => 'Gabriela Soto'
            ],
            [
                'name' => 'Legal',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 6,
                'ambassador_name' => 'Alejandro Méndez'
            ],
            [
                'name' => 'Seguridad',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 10,
                'ambassador_name' => 'Carolina Ríos'
            ],
            [
                'name' => 'Innovación Tecnológica',
                'parent_id' => null,
                'level' => 1,
                'employee_count' => 15,
                'ambassador_name' => 'Sergio Silva'
            ]
        ];

        DB::table('divisions')->insert($divisions);
    }
}
