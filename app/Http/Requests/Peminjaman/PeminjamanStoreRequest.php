<?php

namespace App\Http\Requests\Peminjaman;

use Illuminate\Foundation\Http\FormRequest;

class PeminjamanStoreRequest extends FormRequest
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
            // 'tanggal_pinjam' => ['required', 'date'],
            'judul_praktikum' => ['required', 'string'],

            'items' => ['required', 'array', 'min:1'],

            'items.*.item_type' => ['required', 'in:bhp,alat'],
            'items.*.item_id' => ['required'],
            'items.*.jumlah' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'items.required' => 'Minimal satu item harus dipinjam',
            'items.*.type.in' => 'Tipe item harus bhp atau alat',
            'items.*.id.uuid' => 'ID item tidak valid',
        ];
    }
}
