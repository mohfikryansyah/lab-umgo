<?php

namespace App\Http\Requests\Alat;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AlatUpdateRequest extends FormRequest
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
            'nama_alat' => ['required', 'string', 'max:255'],
            'deskripsi_alat' => ['required', 'string'],
            'foto_alat' => ['sometimes', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'tempat_penyimpanan' => ['required', 'string', 'max:255'],
            'jumlah_stok' => ['required', 'integer', 'min:0'],
            'nomor_inventaris' => ['sometimes', 'string', 'max:255', Rule::unique('data_alats', 'nomor_inventaris')->ignore($this->alat->id)],
            'satuan' => ['required', Rule::in(['buah'])],
            'kondisi_alat' => ['required', Rule::in(['Baik', 'Rusak Ringan', 'Rusak Berat'])],
        ];
    }
}
