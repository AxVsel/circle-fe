export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">Maaf, halaman yang kamu cari tidak ditemukan.</p>
        <a href="/" className="text-blue-500 underline">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
