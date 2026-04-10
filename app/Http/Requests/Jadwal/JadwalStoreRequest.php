<?php

namespace App\Http\Requests\Jadwal;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JadwalStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul_jadwal' => ['required', 'string', 'max:100'],
            'deskripsi_jadwal' => ['required', 'string', 'max:255'],
            'status' => ['required', Rule::in('Terjadwal', 'Selesai')],
            'waktu' => ['required', 'date'],
            'ruangan_jadwal' => ['required', 'string', 'max:100'],
            'penanggung_jawab_id' => ['required']
        ];
    }

    // protected function prepareForValidation(): void
    // {
    //     $this->merge([
    //         'waktu' => Carbon::parse($this->waktu)->format('Y-m-d H:i:s'),
    //     ]);
    // }
}
