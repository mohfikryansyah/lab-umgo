import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BhpStock, PeminjamanFormData } from '@/pages/menu/peminjaman/interface/peminjaman';
import PeminjamanBhpForm from './form-peminjaman';
import { BHPStock } from '@/types';
import toast from 'react-hot-toast';
import peminjaman from '@/routes/peminjaman';

interface CreateProps {
  bhpstocks: BHPStock[];
  peminjaman_bhp: any;
}

export default function EditPeminjamanBHP({ bhpstocks, peminjaman_bhp }: CreateProps) {
  const form = useForm<PeminjamanFormData>({
    tanggal_pinjam: undefined,
    items: [{ bhp_stock_id: '', jumlah_pinjam: 1 }],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    form.post(peminjaman.store().url, {
      onSuccess: () => {
        toast.success('Berhasil melakukan peminjaman.')
      },
      onError: (errors) => {
        console.error('Validation errors:', errors);
      },
    });
  };

  return (
    <>
      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">
                Tambah Peminjaman BHP
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Isi form di bawah untuk membuat peminjaman BHP baru
              </p>
            </div>

            <div className="p-6">
              <PeminjamanBhpForm
                form={form}
                bhpstocks={bhpstocks}
                onSubmit={handleSubmit}
                submitLabel="Simpan Peminjaman"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}