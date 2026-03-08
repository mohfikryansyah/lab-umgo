import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Props {
  fileUrl: string;
  judul: string;
}

export default function DocumentViewer({ fileUrl, judul }: Props) {
  const viewerUrl = `/pdfjs/web/viewer.html?file=${encodeURIComponent(fileUrl)}`;

  return (
    <div className="w-full h-screen">
      <iframe
        src={viewerUrl}
        className="w-full h-full border-0"
      />
    </div>
  );
}