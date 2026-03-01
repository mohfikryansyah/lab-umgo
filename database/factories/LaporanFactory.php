<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Laporan>
 */
class LaporanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pelapor_id' => User::factory(),

            'judul' => $this->faker->sentence(4),

            'deskripsi' => $this->faker->paragraph(5),

            'file_laporan' => 'laporan/' . $this->faker->uuid() . '.pdf',

            'tanggal_melapor' => $this->faker->date(),

            'tipe' => $this->faker->randomElement([
                'Harian',
                'Mingguan',
                'Bulanan',
                'Insiden',
            ]),
        ];
    }
}
