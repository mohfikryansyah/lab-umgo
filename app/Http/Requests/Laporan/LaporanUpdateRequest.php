<?php

namespace App\Http\Requests\Laporan;

use Illuminate\Foundation\Http\FormRequest;

class LaporanUpdateRequest extends FormRequest
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
            'judul' => ['required', 'string', 'max:100'],
            'deskripsi' => ['required', 'string', 'max:255'],
            'tipe' => ['required', 'in:Harian,Mingguan,Bulanan,Insiden'],
            // 'tanggal_melapor' => ['required', 'date'],
            'file_laporan' => ['sometimes', 'file', 'mimes:pdf,doc,docx', 'max:2048'],
        ];
    }
}
