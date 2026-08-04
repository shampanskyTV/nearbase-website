import Image from 'next/image';

export default function BrandLogoNav() {
  return (
    <>
      <img src="/logo.svg" alt="Lamert Partners" className="logo-light" style={{ height: '42px', width: 'auto', display: 'block' }} />
      <img src="/logo-dark.svg" alt="Lamert Partners" className="logo-dark-mode" style={{ height: '42px', width: 'auto', display: 'block' }} />
    </>
  );
}