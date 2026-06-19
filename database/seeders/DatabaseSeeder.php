<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ← Run RoleSeeder first before creating users
        $this->call([
            RoleSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Viron',
            'email' => 'viron@gmail.com',
            'role_id' => 1,
        ]);
    }
}