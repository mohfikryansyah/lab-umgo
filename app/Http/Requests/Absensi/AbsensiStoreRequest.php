<?php

namespace App\Http\Requests\Absensi;

use Illuminate\Foundation\Http\FormRequest;

class AbsensiStoreRequest extends FormRequest
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
            'staff_id' => ['required', 'exists:users,id'],
            'waktu_masuk' => ['required', 'date'],
            'waktu_keluar' => ['nullable', 'date', 'after_or_equal:waktu_masuk'],
            'status' => ['required', 'in:Hadir,Izin,Sakit,Alpa'],
            'keterangan' => ['nullable', 'string'],
        ];
    }
}
