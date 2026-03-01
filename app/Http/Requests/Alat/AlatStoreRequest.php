<?php

namespace App\Http\Requests\Alat;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AlatStoreRequest extends FormRequest
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
            'foto_alat' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'tempat_penyimpanan' => ['required', 'string', 'max:255'],
            'jumlah_stok' => ['required', 'integer', 'min:0'],
            'nomor_inventaris' => ['required', 'string', 'max:255', 'unique:data_alats,nomor_inventaris'],
            'satuan' => ['required', Rule::in(['buah'])],
            'kondisi_alat' => ['required', Rule::in(['Baik', 'Rusak Ringan', 'Rusak Berat'])],
        ];
    }

    public function messages(): array
    {
        return [
            'nomor_inventaris.unique' => 'Nomor inventaris sudah digunakan.',
            'foto_alat.image' => 'File harus berupa gambar.',
        ];
    }
}
