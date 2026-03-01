<?php

namespace App\Http\Requests\BHP;

use Illuminate\Foundation\Http\FormRequest;

class BHPStoreRequest extends FormRequest
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
            'nama_bahan' => ['required', 'string', 'max:255'],
            'jumlah_stok' => ['required', 'integer'],
            'satuan' => ['required', 'string', 'in:botol,pcs,box'],
            'tanggal_kadaluarsa' => ['date'],
            'supplier' => ['required', 'string', 'max:255'],
            'foto_bahan' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ];
    }
}
