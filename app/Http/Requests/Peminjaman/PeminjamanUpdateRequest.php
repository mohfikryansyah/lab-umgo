<?php

namespace App\Http\Requests\Peminjaman;

use Illuminate\Foundation\Http\FormRequest;

class PeminjamanUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['required', 'in:dipinjam,selesai'],

            'items' => ['nullable', 'array'],
            'items.*.id' => ['required', 'uuid'],
            'items.*.tanggal_dikembalikan' => ['nullable', 'date'],
            'items.*.kondisi_kembali' => [
                'nullable',
                'in:Baik,Rusak Ringan,Rusak Berat'
            ],
        ];
    }
}
