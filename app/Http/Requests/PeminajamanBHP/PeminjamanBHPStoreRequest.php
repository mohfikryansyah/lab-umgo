<?php

namespace App\Http\Requests\PeminajamanBHP;

use Illuminate\Foundation\Http\FormRequest;

class PeminjamanBHPStoreRequest extends FormRequest
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
            'tanggal_pinjam' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.bhp_stock_id' => 'required|exists:bhp_stock,id',
            'items.*.jumlah_pinjam' => 'required|integer|min:1',
        ];
    }
}
